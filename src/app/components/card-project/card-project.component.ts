import { Component, Input, OnInit } from '@angular/core';
import { IProject } from '../../interfaces/IProject.interface';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css'],
  host:{
    "class":"card card--project"
  }
})
export class CardProjectComponent implements OnInit {

  @Input() project !:IProject;
  constructor() { }

  ngOnInit(): void {
  }

}
