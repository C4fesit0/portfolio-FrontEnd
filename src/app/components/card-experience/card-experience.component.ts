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

  experiences:IExperience[]= [];

  experienceDto!:IExperienceDto;


  constructor(private experienceService:ExperienceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.experienceService.getExperienceData().subscribe((experiences=>{
      this.experiences = experiences;
      //console.log(this.experiences)
    }))
  }


  public open(modal: any): void {
    this.modalService.open(modal);
  }

  actualizarPerfil(data: NgForm):void{
    console.log(data.value)
  }

  cargaImagen(event:Event):void{
    console.log(event)
  }
}
