import { Component, Input } from '@angular/core';
import { IProject } from 'src/app/interfaces/IProject.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  host:{
    "class":"card card--project mb-2"
  }
})
export class ProjectComponent {
  @Input() project !:IProject;
}
