import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  icon:string = '../assets/icons/sun.svg';
  iconText:string='Light Mode';
  languages=[
    {
      flag:'assets/icons/ar.svg',
      language:'es',
    },{
      flag:'assets/icons/gb.svg',
      language:'en',
    }
  ]
  colors = [
    {
      color: 'hsl(214,84%,56%)',
      class: 'colors__item colors__item--blue'
    },
    {
      color: 'hsl(150,84%,56%)',
      class: 'colors__item colors__item--green'
    },
    {
      color: 'hsl(276,84%,56%)',
      class: 'colors__item colors__item--purple'
    },
    {
      color: 'hsl(46,84%,56%)',
      class: 'colors__item colors__item--orange'
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

  changeTheme():void{
    document.body.classList.toggle("dark");
    if(this.iconText=='Dark Mode'){
        this.icon= '../assets/icons/sun.svg';
        this.iconText='Light Mode';
    }else{
        this.icon= '../assets/icons/moon.svg';
        this.iconText='Dark Mode';
    }
  }

  changeColor(color:string):void{
    console.log(color);
    document.documentElement.style.setProperty('--primary-color',color)
  }

  changeLenguage(language:string):void{
    console.log(language)
  }

}
