import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { IEducation } from '../../interfaces/IEducation.interface';

@Component({
  selector: 'app-card-education',
  templateUrl: './card-education.component.html',
  styleUrls: ['./card-education.component.css'],
  host:{
    "class": "card card--experience"
  }
})
export class CardEducationComponent implements OnInit {

  educationData:IEducation[] = [];

  constructor(private educationService:EducationService) { }

  ngOnInit(): void {
    this.educationService.getEducationData().subscribe((data)=>{
      this.educationData= data;
    })
  }

}
