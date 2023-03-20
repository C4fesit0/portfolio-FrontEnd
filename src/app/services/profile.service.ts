import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../interfaces/IProfile.interface';
import { IProfileDto } from '../interfaces/IProfileDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //apiURL='http://localhost:3000/profile';
  endPoint='http://localhost:8080/persona/';
  //endPoint='https://porft-back.onrender.com/persona/';
  constructor(private http:HttpClient) {
   }

   getProfileData():Observable<IProfile>{
    return this.http.get<IProfile>(this.endPoint);
   }

   getProfileImage(id:number):Observable<any>{
    return this.http.get<any>(this.endPoint+"image/"+id);
   }

   actualizarPerfil(data:IProfileDto):Observable<any>{
    return this.http.put<string>(this.endPoint+"actualizar",data);
   }

}

