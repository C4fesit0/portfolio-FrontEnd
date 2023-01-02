import { Component, Input, OnInit, Output } from '@angular/core';
import { IProject } from 'src/app/interfaces/IProject.interface';
import { ISkill } from 'src/app/interfaces/ISkill.interface';
import { SkillService } from '../../services/skill.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  @Output() usuarioLogeado:boolean = false;

  projects:IProject[] = [];
  skillsFront:ISkill[] = [];
  skillsBack:ISkill[]=[];

  constructor(private skillService:SkillService,
    private projectService:ProjectService, public userService:UserService) { }

  ngOnInit(): void {

     //Skills
     this.skillService.getSkills().subscribe( (skills)=>{
      skills.forEach((skill) =>{
       switch(skill.rol.id){
         case 2:
           this.skillsBack.push(skill);
           break;
         case 1:
           this.skillsFront.push(skill);
           break;
       }
      })
      //console.log(this.skillsFront);
      //console.log(this.skillsBack);

   });

   //Projects
   this.projectService.getProjects().subscribe((projects)=>{
     //console.log(projects);
     this.projects = projects;
   })

   this.usuarioLogeado=this.userService.usuarioLogeado;

  }

}
