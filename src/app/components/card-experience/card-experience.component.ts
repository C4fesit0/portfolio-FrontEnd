import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from '../../interfaces/IExperience.interface';
import { ExperienceService } from '../../services/experience.service';
import { IExperienceDto } from '../../interfaces/IExperienceDto.interface';
import { NgForm } from '@angular/forms';
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
  archivo!:File;
  existeArchivo:boolean = false;
  experiences:IExperience[]= [];

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

  constructor(private experienceService:ExperienceService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.experienceService.getExperienceData().subscribe((experiences=>{
      this.experiences = experiences;
      console.log('Exp API==>')
      console.log(this.experiences)
    }))

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  cargaImagen(event:any){
    this.existeArchivo = true;
    this.archivo = event.target.files[0];
    //console.log(this.archivo);
  }

  agregarExperiencia(data:NgForm):void{
    //console.log("NgForm=====>");
    //console.log(data.value);
    //console.log("Experiencia=====>");
    //console.log(this.experienceDto);

    this.experienceService.createExperience(this.experienceDto).subscribe((e)=>{
      if(this.existeArchivo){
        this.experienceService.uploadImage(this.archivo,e.id).subscribe((e)=>{
          this.existeArchivo = false;
          console.log(e);
        })
      }
      if(e.id){
        this.experiences.push(e);
      }else{
        console.log(e);
      }
    });
    this.resetExperienceDto();
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
