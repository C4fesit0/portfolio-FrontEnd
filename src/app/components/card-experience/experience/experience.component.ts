import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IExperience } from '../../../interfaces/IExperience.interface';
import { IExperienceDto } from '../../../interfaces/IExperienceDto.interface';
import { ExperienceService } from '../../../services/experience.service';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() edit:boolean = false;
  @Input() experience!:IExperience;
  @Output() deleteExp = new EventEmitter<IExperience>();

  experienceDto:IExperienceDto = {
    id_persona:1,
    puesto: '',
    empresa: '',
    fecha_inicio: '',
    fecha_final: '',
    actualidad: false,
    descripcion: '',
    imagen: ''
  }

  image!:string | undefined;

  event:any;
  existeArchivo:boolean =false;

  constructor(private experienceService:ExperienceService,
    private storage:Storage) { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteExp.emit(this.experience);
  }


  actualizarExperiencia(experiencia:IExperience){
    console.log(experiencia);
   console.log('CARD EXPERIENCE');
    this.setExperienceDto(experiencia);
   if(this.existeArchivo){
    const name = "experiences/experiencia_"+this.experience.id;
        const file = this.event.target.files[0];
        const imageRef= ref(this.storage, `images/`+name);
        uploadBytes(imageRef,file)
        .then(res =>{
          console.log(res)
          const imagesRef = ref(this.storage,'images/experiences/experiencia_'+this.experience.id);
          getDownloadURL(imagesRef).then((url)=>{
            console.log(url)
            this.experienceDto.imagen = url;
            this.experienceService.updateExperience(this.experience.id,this.experienceDto).subscribe((e)=>{
              this.experience = e;
            });
          })
          .catch(err =>{console.log(err)});
        })
        .catch(err=>{
          console.log(err);
        })
        this.existeArchivo=false;
   }else{
      this.experienceDto.imagen = this.experience.imagen;
      this.experienceService.updateExperience(this.experience.id,this.experienceDto).subscribe((e)=>{
        this.experience = e;
      });
   }
  }

  actualizarImagen($event:any){
    console.log($event);
    this.existeArchivo=true;
    this.event = $event;
  }

  setExperienceDto(experiencia:IExperience){
    this.experienceDto.puesto = experiencia.puesto;
    this.experienceDto.actualidad = experiencia.actualidad;
    this.experienceDto.empresa = experiencia.empresa;
    this.experienceDto.descripcion = experiencia.descripcion;
    this.experienceDto.fecha_inicio = experiencia.fecha_inicio;
    this.experienceDto.fecha_final = experiencia.fecha_final;
    this.experienceDto.imagen =this.experience.imagen;
  }

}

