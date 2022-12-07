import { Component, Input, OnInit } from '@angular/core';
import { IExperience } from '../../../interfaces/IExperience.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() experience!:IExperience;

  constructor() { }

  ngOnInit(): void {
  }

}
