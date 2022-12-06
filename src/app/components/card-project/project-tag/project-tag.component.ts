import { Component, Input, OnInit } from '@angular/core';
import { IProject } from '../../../interfaces/IProject.interface';

@Component({
  selector: 'app-project-tag',
  templateUrl: './project-tag.component.html',
  styleUrls: ['./project-tag.component.css'],
  host:{
    "class":"project__tags"
  }
})
export class ProjectTagComponent implements OnInit {

  @Input() tags:string[] =[];

  constructor() { }

  ngOnInit(): void {
  }

}
