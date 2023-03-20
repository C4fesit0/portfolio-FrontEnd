import { Component, Input, OnInit } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { IEducation } from '../../interfaces/IEducation.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEducationDto } from 'src/app/interfaces/IEducationDto.interface';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-card-education',
  templateUrl: './card-education.component.html',
  styleUrls: ['./card-education.component.css'],
  host:{
    "class": "card card--experience"
  }
})
export class CardEducationComponent implements OnInit {

  @Input() edit:boolean = false;
  educationData:IEducation[] = [];

  educacionDto: IEducationDto = {
  id_persona:1,
  titulo:'',
  fecha_inicio:'',
  fecha_final:'',
  actualidad:false,
  institucion:'',
  imagen:'',
  id_nivel_estudio:0,
  }

  event:any;
  existeArchivo:boolean= false;
  constructor(private eduacionService:EducationService,
            private modalService: NgbModal,
            private storage:Storage) { }

  ngOnInit(): void {
    this.eduacionService.getEducationData().subscribe((data)=>{
      //console.log(data);
      this.educationData= data;
    })
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  agregarEducacion(data: any){

    console.log(this.existeArchivo)
    console.log(data.value);
    this.setEducationDtoData(data.value);
    console.log('EDUCACION DTO');
    console.log(this.educacionDto);

    if(this.existeArchivo){
        this.eduacionService.createEducation(this.educacionDto).subscribe((education)=>{
        const name = "educations/education_"+education.id;
        const file = this.event.target.files[0];
        const imageRef= ref(this.storage, `images/`+name);
        uploadBytes(imageRef,file)
            .then(res =>{
              console.log(res)
              const imagesRef = ref(this.storage,'images/educations/education_'+education.id);
              getDownloadURL(imagesRef).then((url)=>{
                console.log(url)
                this.educacionDto.imagen = url;
                this.eduacionService.updateEducation(this.educacionDto,education.id).subscribe((e)=>{
                this.existeArchivo =false;
                this.educationData.push(e);
                });
              })
              .catch(err =>{console.log(err)});
            })
            .catch(err=>{
              console.log(err);
            })
            this.existeArchivo=false;

        })
       }else{
          this.eduacionService.createEducation(this.educacionDto).subscribe((e)=>{
            this.existeArchivo =false;
            this.educationData.push(e);
          })
       }

    this.resetEducationDto();

  }

  eliminarEducacion(data:any){
    console.log(data);
    this.eduacionService.deleteEducation(data).subscribe((e)=>{
     this.educationData = this.educationData.filter((education)=> {
      return education.id!=data
     });
    })
  }

  cargarImagen($event:any){
    this.existeArchivo = true;
    this.event = $event;
  }

  actualidad(data: any){
    console.log(data.target.checked)
    this.educacionDto.actualidad = data.target.checked;
  }

  nivelEstudio(data:any){
    console.log(data.target.value);
  }

  setEducationDtoData(data:any){
    this.educacionDto.actualidad = data.actualidad;
    this.educacionDto.fecha_inicio = data.fecha_inicio;
    this.educacionDto.fecha_final = data.fecha_final;
    this.educacionDto.id_nivel_estudio = data.nivel_estudio;
    this.educacionDto.institucion = data.institucion;
    this.educacionDto.titulo =data.titulo;
    this.educacionDto.imagen = '';
  }

  resetEducationDto(){
  this.educacionDto = {
  id_persona:1,
  titulo:'',
  fecha_inicio:'',
  fecha_final:'',
  actualidad:false,
  institucion:'',
  imagen:'',
  id_nivel_estudio:0,
  }

  }

}
