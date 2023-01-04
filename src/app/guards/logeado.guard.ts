import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LogeadoGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router){}


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let resp = this.userService.usuarioLogeado;
    console.log("GUARD:"+resp);
    if(!resp){
      this.router.navigate(['/'])
    }
      return resp
  }

}
