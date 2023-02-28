import { Component, Input, EventEmitter, Output,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProject } from 'src/app/interfaces/IProject.interface';
import { ISkill } from '../../../interfaces/ISkill.interface';
import { IProjectDto } from 'src/app/interfaces/IProjectDto.interface';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  host:{
    "class":"card card--project mb-2"
  }
})
export class ProjectComponent implements OnInit {

  @Input() skills:ISkill[] = [];
  @Input() project !:IProject;
  imagen!:string | undefined;
  @Input() edit:boolean=false;

  @Output() eliminarEvent = new EventEmitter<number>();
  existeImg: boolean =false;
  archivo!:File;
  tecnologiasIds: number[] = [];

  projectDto:IProjectDto = {
    nombre:'',
    descripcion:'',
    demo:'',
    repositorio:'',
    id_autor:1,
    image:'',
    tecnologias:[]
  }

  constructor(private projectService:ProjectService,private modalService: NgbModal){}

  ngOnInit(){
    this.leerIds();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  eliminarProyecto(){
    this.eliminarEvent.emit(this.project.id);
  }

  leerIds(){
    this.tecnologiasIds = this.project.tecnologias.map((e)=>{
      return e.id;
    })
    console.log(this.tecnologiasIds)
  }


  cargaImagen(event:any):void{
    console.log(event.target.files[0])
    this.archivo = event.target.files[0];
    this.existeImg=true;
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
    console.log(this.tecnologiasIds);
  }

  actualizarProyecto(data:any){
    console.log("DATA==>");
    console.log(data.value);
    this.setProyectoDto(data.value);
    console.log("DTO====>");
    console.log(this.projectDto);
    this.projectService.updateProject(this.projectDto,this.project.id).subscribe((e)=>{
      if(this.existeImg){
        this.projectService.uploadImage(this.archivo,this.project.id).subscribe((e)=>{
          console.log(e)
          this.convertirArchivo(this.archivo);
        })
      }
      console.log(e);
      this.project = e;
    });
  }

  setProyectoDto(data:any){
    this.projectDto.demo = data.demo;
    this.projectDto.descripcion = data.descripcion;
    this.projectDto.image= this.archivo?this.archivo.name:this.project.image;
    this.projectDto.nombre= data.nombre;
    this.projectDto.repositorio= data.repositorio;
    this.projectDto.tecnologias= this.tecnologiasIds;
    console.log(this.project);
  }

  convertirArchivo(file:File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.imagen =reader.result?.toString();
    };
  }

  existeTecnologia(skill:ISkill){
    return this.project.tecnologias.find((e)=>{
      return e.id==skill.id
    })
  }

}
