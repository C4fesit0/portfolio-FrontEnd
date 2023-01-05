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

  @Input() edit:boolean =false;
  archivo!:File;

  experiences:IExperience[]= [];

  experienceDto:IExperienceDto = {
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
      //console.log(this.experiences)
    }))
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }

  cargaImagen(event:any){
    this.archivo = event.target.files[0];
    //console.log(this.archivo);
  }

  agregarExperiencia(data:NgForm):void{
    console.log("asdasdasd=====>");
    console.log(data.value);
  }

  actualidad(event: any):void{
    this.experienceDto.actualidad=event.target.checked;
  }


}
