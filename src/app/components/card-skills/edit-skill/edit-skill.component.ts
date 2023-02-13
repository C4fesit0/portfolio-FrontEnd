import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISkill } from '../../../interfaces/ISkill.interface';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent {

  @Input() skill!:ISkill;

  skillActualizada:ISkill={
    id:0,
    nombre:'',
    logo:'',
    rol:{
      id:0,
      nombre:''
    }
  };

  @Output() skillEmmiter = new EventEmitter<ISkill>()

  constructor(private modalService: NgbModal){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  guardarSkill(data:any){
    console.log(data.value);
    console.log(this.skill);

    this.skillActualizada.id = this.skill.id;
    this.skillActualizada.nombre = data.value.nombre;
    this.skillActualizada.logo = data.value.logo;
    this.skillActualizada.rol = this.skill.rol;

    console.log(this.skillActualizada);
    this.skillEmmiter.emit(this.skillActualizada);
  }


}
