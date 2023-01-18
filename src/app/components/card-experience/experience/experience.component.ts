import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IExperience } from '../../../interfaces/IExperience.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() experience!:IExperience;
  @Output() deleteExp = new EventEmitter<IExperience>();

  constructor() { }

  ngOnInit(): void {
  }

  eliminarExp(){
    console.log("EMITTIENDO DATOS");
    this.deleteExp.emit(this.experience);
  }

}
