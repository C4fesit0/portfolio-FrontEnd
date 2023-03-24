import { Component, Input, OnInit } from '@angular/core';
import { IProject } from '../../interfaces/IProject.interface';
import { ProjectService } from 'src/app/services/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ISkill } from '../../interfaces/ISkill.interface';
import { IProjectDto } from '../../interfaces/IProjectDto.interface';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';

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
  existeArchivo :boolean=false;
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

  event:any;

  projects:IProject[] = [];
  constructor(private projectService:ProjectService,
    private modalService: NgbModal,
    private storage:Storage) { }

  ngOnInit(): void {
   //Projects
  this.projectService.getProjects().subscribe((projects)=>{
   console.log(projects);
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
     if(this.existeArchivo){
        this.projectService.createProject(this.projectDto).subscribe((project)=>{
        const name = "projects/project_"+project.id;
        const file = this.event.target.files[0];
        const imageRef= ref(this.storage, `images/`+name);
        uploadBytes(imageRef,file)
            .then(async res =>{
              const imagesRef = ref(this.storage,'images/projects/project_'+project.id);
              await getDownloadURL(imagesRef).then((url)=>{
                this.projectDto.image = url;
                console.log("Se carga URL");
                console.log(this.projectDto);
                this.existeArchivo =false;
                  this.projectService.updateProject(this.projectDto,project.id).subscribe((e)=>{
                    console.log(e);
                    this.projects.push(e);
                    this.existeArchivo =false;
                  })
              })
            })
            .catch(err=>{
              console.log(err);
            })
        })

       }else{
          this.projectService.createProject(this.projectDto).subscribe((e)=>{
            console.log(e);
           this.existeArchivo =false;
            this.projects.push(e);
          })
       }
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
    this.projectDto.image = '';
    this.projectDto.tecnologias = this.tecnologiasIds;
    console.log(this.projectDto);
  }

  cargaImagen($event:any):void{
    this.event = $event;
    this.existeArchivo = true;
  }


}
