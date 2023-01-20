import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IExperience } from '../../../interfaces/IExperience.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() edit:boolean = false;
  @Input() experience!:IExperience;
  @Output() deleteExp = new EventEmitter<IExperience>();
  @Output() updateExp = new EventEmitter<IExperience>();

  constructor() { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteExp.emit(this.experience);
  }




}
