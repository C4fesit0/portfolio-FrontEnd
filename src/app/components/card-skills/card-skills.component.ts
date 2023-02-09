import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISkill } from 'src/app/interfaces/ISkill.interface';
import { ISkillDto } from 'src/app/interfaces/ISkillDto.interface';

@Component({
  selector: 'app-card-skills',
  templateUrl: './card-skills.component.html',
  styleUrls: ['./card-skills.component.css']
})
export class CardSkillsComponent implements OnInit {

  @Input() skills:ISkill[]=[]

  logo!:File;

  skillDto: ISkillDto = {
    id_persona:1,
    logo:'',
    nombre:'',
    rol:0
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  agregarSkill(data:any){
    this.skillDto.rol = this.skills[0].rol.id
    console.log(data.value);
    console.log(this.skillDto)
    console.log(this.logo);
  }

  saveLogo(data:any){
    console.log(data.target.files[0])
    this.skillDto.logo = data.target.files[0].name;
    this.logo = data.target.files[0];
  }
}
