import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from '../interfaces/ILoginData.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  usuarioLogeado:boolean = false;
  //endPoint='http://localhost:8080/usuario/';
  endPoint = 'http://localhost:8080/usuario/login';
  //endPoint = 'https://porft-back.onrender.com/usuario/login';
  constructor(private http:HttpClient) { }

  login(data:ILoginData):Observable<boolean>{
    const body ={
      email:data.email,
      password:data.password
    }
    return this.http.post<boolean>(this.endPoint,body);
  }

  logout():boolean{
    this.usuarioLogeado = false;
    return this.usuarioLogeado;
  }

}
