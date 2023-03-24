import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from '../../interfaces/IExperience.interface';
import { ExperienceService } from '../../services/experience.service';
import { IExperienceDto } from '../../interfaces/IExperienceDto.interface';
import { NgForm } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';
@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.css'],
  host:{
    "class": "card card--experience"
  }
})

export class CardExperienceComponent implements OnInit {

  @Input() edit:boolean =true;
  event!:any;
  existeArchivo:boolean = false;
  experiences:IExperience[]= [];

  url:string ='';

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

  constructor(private experienceService:ExperienceService,
     private modalService: NgbModal,
     public imageService:ImageService,
     private storage:Storage) {
  }

  ngOnInit(): void {
    this.experienceService.getExperienceData().subscribe((experiences=>{
      this.experiences = experiences;
      console.log('Exp API==>')
      console.log(this.experiences)
    }))

   // this.getImage(58);

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


  agregarExperiencia(data:NgForm):void{
    //console.log("NgForm=====>");
    console.log(data.value);
    console.log("Experiencia=====>");
    console.log(this.experienceDto);

    if(this.existeArchivo){
    this.experienceService.createExperience(this.experienceDto).subscribe((e)=>{
        const name = "experiences/experiencia_"+e.id;
        const file = this.event.target.files[0];
        const imageRef= ref(this.storage, `images/`+name);
        uploadBytes(imageRef,file)
        .then(res =>{
          console.log(res)
          const imagesRef = ref(this.storage,'images/experiences/experiencia_'+e.id);
          getDownloadURL(imagesRef).then((url)=>{
            console.log(url)
            this.experienceDto.imagen = url;
            console.log(e);
            this.experienceService.updateExperience(e.id,this.experienceDto).subscribe((e)=>{
            this.experiences.push(e);
            });
            this.resetExperienceDto();
          })
          .catch(err =>{console.log(err)});
        })
        .catch(err=>{
          console.log(err);
        })


      });
    }
  }

/*
  getImage(id:number){

  } */

  cargaImagen($event:any){
    this.event = $event;
  }

  actualizarImagen(event:any){
    console.log('CARD-EXP')
    console.log(event);
    this.existeArchivo = true;
    this.event = event;

  }

  actualidad(event: any):void{
    this.experienceDto.actualidad=event.target.checked;
  }

  eliminarExperiencia(data: any){
    //console.log(data);
    if(data.id){
      this.experienceService.deleteExperience(data.id).subscribe((e)=>{
        //console.log(e);
        if(e){
          this.experiences = this.experiences.filter((exp)=>{
            return exp.id!=data.id
          })
        }
      })
    }
  }


 /*  setExperienceDto(experiencia:IExperience){
    this.experienceDto.puesto = experiencia.puesto;
    this.experienceDto.actualidad = experiencia.actualidad;
    this.experienceDto.empresa = experiencia.empresa;
    this.experienceDto.descripcion = experiencia.descripcion;
    this.experienceDto.fecha_inicio = experiencia.fecha_inicio;
    this.experienceDto.fecha_final = experiencia.fecha_final;
    this.experienceDto.imagen = experiencia.imagen;
  } */

  resetExperienceDto(){
    this.experienceDto = {
      id_persona:1,
      puesto: '',
      empresa: '',
      fecha_inicio: '',
      fecha_final: '',
      actualidad: false,
      descripcion: '',
      imagen: ''
    }
  }

  }
