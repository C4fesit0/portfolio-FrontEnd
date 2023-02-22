import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISkill } from 'src/app/interfaces/ISkill.interface';
import { ISkillDto } from 'src/app/interfaces/ISkillDto.interface';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-card-skills',
  templateUrl: './card-skills.component.html',
  styleUrls: ['./card-skills.component.css']
})
export class CardSkillsComponent implements OnInit {

  @Input() edit:boolean = false;
  @Input() skills:ISkill[]=[]
  @Output() addSkill = new EventEmitter<ISkillDto>();
  logo!:File;

  skillDto: ISkillDto = {
    id_persona:1,
    logo:'',
    nombre:'',
    rol:0
  };

  constructor(private modalService: NgbModal,private skillService:SkillService) { }

  ngOnInit(): void {

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


  agregarSkill(data:any){
    this.skillDto.rol = this.skills[0].rol.id
    console.log(data);
    this.skillService.createSkill(this.skillDto).subscribe((res)=>{
      this.skills.push(res);
    })
  }

  deleteSkill(id:number){
    console.log(id)
    this.skillService.deleteSkill(id).subscribe((res)=>{
     this.skills =  this.skills.filter((skill)=>{
        return skill.id!==res.id;
      })
    })
  }

  saveLogo(data:any){
    console.log(data.target.files[0])
    /*this.skillDto.logo = data.target.files[0].name;
     this.logo = data.target.files[0]; */
  }



  resetDto(){
    this.skillDto = {
      id_persona:1,
      logo:'',
      nombre:'',
      rol:0
    };
  }
}
