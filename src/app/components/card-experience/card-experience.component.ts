import { Component, OnInit } from '@angular/core';
import { IExperience } from '../../interfaces/IExperience.interface';
import { HttpClient } from '@angular/common/http';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.css'],
  host:{
    "class": "card card--experience"
  }
})

export class CardExperienceComponent implements OnInit {

  experiences:IExperience[]= [];

  constructor(private experienceService:ExperienceService) { }

  ngOnInit(): void {
    this.experienceService.getExperienceData().subscribe((experiences=>{
      this.experiences = experiences;
      //console.log(this.experiences)
    }))
  }

}
