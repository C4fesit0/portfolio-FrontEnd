import { Component, Input, EventEmitter, Output } from '@angular/core';
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
  imagen!:string;
  @Input() edit:boolean=false;

  @Output() eliminarEvent = new EventEmitter<number>();


  eliminarProyecto(){
    this.eliminarEvent.emit(this.project.id);
  }

}
