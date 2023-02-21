import { Component, Input, OnInit } from '@angular/core';
import { IProject } from '../../interfaces/IProject.interface';
import { ProjectService } from 'src/app/services/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css'],
  host:{
    "class":"card--project"
  }
})
export class CardProjectComponent implements OnInit {

  projects:IProject[] = [];
  constructor(private projectService:ProjectService,private modalService: NgbModal) { }

  ngOnInit(): void {
    //Projects
   this.projectService.getProjects().subscribe((projects)=>{
   /*  console.log(projects); */
    this.projects = projects;
  })
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  agregarProyecto(data: NgForm):void{
    console.log(data.value)
  }

  cargaImagen(event:Event):void{
    console.log(event.target)
  }


}
