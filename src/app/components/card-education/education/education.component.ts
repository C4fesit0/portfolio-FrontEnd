import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEducation } from '../../../interfaces/IEducation.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() education!:IEducation;
  @Output() deleteEducation = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  eliminarExperiencia(){
    this.deleteEducation.emit(this.education.id);
  }

}
