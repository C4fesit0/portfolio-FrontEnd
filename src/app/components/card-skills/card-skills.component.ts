import { Component, Input, OnInit } from '@angular/core';
import { ISkill } from 'src/app/interfaces/ISkill.interface';

@Component({
  selector: 'app-card-skills',
  templateUrl: './card-skills.component.html',
  styleUrls: ['./card-skills.component.css']
})
export class CardSkillsComponent implements OnInit {

  @Input() skills:ISkill[]=[]
  constructor() { }

  ngOnInit(): void {
  }
}
