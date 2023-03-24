import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEducation } from '../../../interfaces/IEducation.interface';
import { IEducationDto } from '../../../interfaces/IEducationDto.interface';
import { EducationService } from '../../../services/education.service';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() edit:boolean = false;
  @Input() education!:IEducation;
  @Output() deleteEducation = new EventEmitter<number>();
  event:any;
  existeArchivo:boolean=false;
  educacionDto:IEducationDto= {
    id_persona:1,
    titulo:'',
    fecha_inicio:'',
    fecha_final:'',
    actualidad:false,
    institucion:'',
    imagen:'',
    id_nivel_estudio:1,
  }


  constructor(private eduacionService:EducationService,
    private storage:Storage) { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteEducation.emit(this.education.id);
  }

  actualizarEducacion(data:IEducation){
    /* console.log('ACTUALIZAR EDUCACION');
    console.log(this.existeArchivo);
    console.log(data);
    console.log('--------------------------'); */
    this.setEducacionDto(data);
    console.log(this.educacionDto)
    if(this.existeArchivo){
      const name = "educations/education_"+this.education.id;
      const file = this.event.target.files[0];
      const imageRef= ref(this.storage, `images/`+name);
      uploadBytes(imageRef,file)
          .then(res =>{
            console.log(res)
            const imagesRef = ref(this.storage,'images/educations/education_'+this.education.id);
            getDownloadURL(imagesRef).then((url)=>{
              console.log(url)
              this.educacionDto.imagen = url;
              this.eduacionService.updateEducation(this.educacionDto,this.education.id).subscribe((e)=>{
                this.education = e;
              });
            })
            .catch(err =>{console.log(err)});
          })
          .catch(err=>{
            console.log(err);
          })
          this.existeArchivo=false;
     }else{
        this.educacionDto.imagen = this.education.imagen;
        this.eduacionService.updateEducation(this.educacionDto,data.id).subscribe((res)=>{
          this.education = res
        })
     }
    }


  actualizarImagen($event:any){
    console.log($event)
    this.existeArchivo=true;
    this.event = $event;
  }

  setEducacionDto(data:IEducation){
    this.educacionDto.actualidad = data.actualidad;
    this.educacionDto.fecha_final=data.fecha_final;
    this.educacionDto.fecha_inicio=data.fecha_inicio;
    this.educacionDto.id_nivel_estudio=data.nivel.id
    this.educacionDto.imagen=this.education.imagen;
    this.educacionDto.id_persona=1;
    this.educacionDto.institucion=data.institucion;
    this.educacionDto.titulo=data.titulo;
  }
  }





