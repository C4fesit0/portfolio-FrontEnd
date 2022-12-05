import { Component, OnInit } from '@angular/core';
import { ISkill } from 'src/app/interfaces/ISkill.interface';

@Component({
  selector: 'app-card-skills',
  templateUrl: './card-skills.component.html',
  styleUrls: ['./card-skills.component.css']
})
export class CardSkillsComponent implements OnInit {

  skills : ISkill= {
    "rol":"Front-End",
    "technologies":[
      {
        "name": "HTML",
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/768px-HTML5_Badge.svg.png"
      },
      {
        "name": "CSS",
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png"
      },
      {
        "name": "JavaScript",
        "src": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
      },
      {
        "name": "Bootstrap",
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png"
      },
      {
        "name": "Angular",
        "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png"
      }
    ]
  }
  constructor() { }

  ngOnInit(): void {

  }

}
