import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from '../interfaces/ILoginData.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarioLogeado:boolean =true;
  apiURL='http://localhost:8080/usuario/';

  constructor(private http:HttpClient) { }

  login(data:ILoginData):Observable<boolean>{

    const body ={
      email:data.email,
      password:data.password
    }
    return this.http.post<boolean>("http://localhost:8080/usuario/login",body);
  }

  logout():boolean{
    this.usuarioLogeado =false;
    return this.usuarioLogeado;
  }

}
