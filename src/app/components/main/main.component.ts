import { Component, Input, OnInit, Output } from '@angular/core';
import { ISkill } from 'src/app/interfaces/ISkill.interface';
import { SkillService } from '../../services/skill.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  @Output() usuarioLogeado:boolean = false;

  skills:ISkill[] = [];
  skillsFront:ISkill[] = [];
  skillsBack:ISkill[]=[];

  boton= {
    url:'/login',
    texto: 'Login',
    class:'btn-primary'
  }

  constructor(private skillService:SkillService, public userService:UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     //Skills
     this.skillService.getSkills().subscribe( (skills)=>{
      this.skills = skills;
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

   this.usuarioLogeado=this.userService.usuarioLogeado;

  }

}
