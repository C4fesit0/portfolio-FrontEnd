import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ILoginData } from '../../interfaces/ILoginData.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  data:ILoginData ={
    email: "",
    password:""
  }
  loginResponse!:boolean;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  login(form:NgForm):void{
    this.data = form.value;
    console.log(this.data);
    this.userService.login(this.data).subscribe(response =>{
      console.log(response);
      this.userService.usuarioLogeado = response;
      if(this.userService.usuarioLogeado){
        this.router.navigateByUrl("/edit");
      }
    })
  }

}
