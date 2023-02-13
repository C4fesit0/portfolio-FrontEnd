import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISkill } from '../../../interfaces/ISkill.interface';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent {

  @Input() skill!:ISkill;

  constructor(private modalService: NgbModal){}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  guardarSkill(data:any){
    console.log(data);
  }
}
