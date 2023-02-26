import { Component, Input, OnInit } from '@angular/core';
import { IProject } from '../../interfaces/IProject.interface';
import { ProjectService } from 'src/app/services/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ISkill } from '../../interfaces/ISkill.interface';
import { IProjectDto } from '../../interfaces/IProjectDto.interface';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.css'],
  host:{
    "class":"card--project"
  }
})
export class CardProjectComponent implements OnInit {


  @Input() skills:ISkill[] = [];
  tecnologiasIds:number[] = [];
  existeImg :boolean=false;
  @Input() edit:boolean=false;
  projectDto:IProjectDto = {
    nombre:'',
    descripcion:'',
    demo:'',
    repositorio:'',
    id_autor:1,
    image:'',
    tecnologias:[]
  }

  archivo!:File;

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

  fieldsetChange(event:any){
    console.log(event.target.checked)
    console.log(event.target.id)
    const id = parseInt(event.target.id);
    const checked = event.target.checked;
    if(checked){
      this.tecnologiasIds.push(id)
    }else if(!checked){
      const index = this.tecnologiasIds.indexOf(id);
      this.tecnologiasIds.splice(index,1)
    }
  }


  agregarProyecto(data: NgForm):void{
    console.log(data.value)
    this.setDataDto(data.value);
    console.log(this.projectDto);
    this.projectService.createProject(this.projectDto).subscribe((e)=>{
      if(this.existeImg){
        console.log('se va a cargar una imagen')
        this.projectService.uploadImage(this.archivo,e.id).subscribe((res)=>{
          console.log(res);
        })
      }else if(!this.existeImg)
      {
        this.projects.push(e);
      }
    })
  }

  eliminarProyecto(id:number){
    this.projectService.deleteProject(id).subscribe((res)=>{
      this.projects = this.projects.filter((e)=>{
        return e.id!=id
      })
    });
  }

  setDataDto(data:any):void{
    this.projectDto.nombre = data.nombre;
    this.projectDto.descripcion = data.descripcion;
    this.projectDto.demo = data.demo;
    this.projectDto.repositorio = data.repositorio;
    this.projectDto.image = this.archivo?this.archivo.name:'';
    this.projectDto.tecnologias = this.tecnologiasIds;
    console.log(this.projectDto);
  }

  cargaImagen(event:any):void{
    console.log(event.target.files[0])
    this.archivo = event.target.files[0];
    this.existeImg=true;
  }


}
