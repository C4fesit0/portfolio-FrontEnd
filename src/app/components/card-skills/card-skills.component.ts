import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISkill } from 'src/app/interfaces/ISkill.interface';

@Component({
  selector: 'app-card-skills',
  templateUrl: './card-skills.component.html',
  styleUrls: ['./card-skills.component.css']
})
export class CardSkillsComponent implements OnInit {

  @Input() skills:ISkill[]=[]
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  agregarSkill(data:any){
    console.log(data);
  }
}
