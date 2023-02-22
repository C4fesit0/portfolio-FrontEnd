import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISkill } from '../../../interfaces/ISkill.interface';
import { ISkillDto } from 'src/app/interfaces/ISkillDto.interface';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent {
  @Input() edit:boolean = false;
  @Input() skill!:ISkill;
  @Output() deleteEvent = new EventEmitter<number>();
  skillDto: ISkillDto = {
    id_persona:1,
    logo:'',
    nombre:'',
    rol:0
  };
  constructor(private skillService:SkillService){}

  deleteSkill(id:number){
    this.deleteEvent.emit(id);
  }


  actualizarSkill(data:ISkill){
    //  console.log('CARD SKILL COMPONENT')
    //  console.log(data);

      this.skillDto.logo = data.logo;
      this.skillDto.nombre = data.nombre;
      this.skillDto.rol = data.rol.id;

      this.skillService.updateSkill(data.id,this.skillDto).subscribe((res)=>{
        console.log(res);
        this.skill= res;
      })
    }

}

