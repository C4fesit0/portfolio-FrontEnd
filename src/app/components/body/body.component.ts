import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/interfaces/IProject.interface';
import { ISkill } from 'src/app/interfaces/ISkill.interface';
import { SkillService } from '../../services/skill.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  projects:IProject[] = [];
  skillsFront:ISkill[] = [];
  skillsBack:ISkill[]=[];
  constructor(private skillService:SkillService,
                private projectService:ProjectService) { }

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
       console.log(this.skillsFront);
       console.log(this.skillsBack);

    });
/*
    //Projects
    this.projectService.getProjects().subscribe((projects)=>{
      this.projects = projects;
    }) */
  }


}
