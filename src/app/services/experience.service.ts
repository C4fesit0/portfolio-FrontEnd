import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExperience } from '../interfaces/IExperience.interface';
import { IExperienceDto } from '../interfaces/IExperienceDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  //endPoint = 'http://localhost:3000/experience';
  endPoint = 'http://localhost:8080/experiencia/';
  //endPoint = 'https://porft-back.onrender.com/experiencia/';
  constructor(private http:HttpClient) { }

  getExperienceData():Observable<IExperience[]>{
    return this.http.get<IExperience[]>(this.endPoint);
  }

  createExperience(data:IExperienceDto):Observable<any>{
    return this.http.post<any>(this.endPoint+"crear",data);
  }

  deleteExperience(id:number):Observable<any>{
    return this.http.delete<any>(this.endPoint+'eliminar/'+id);
  }

  updateExperience(id:number,experience:IExperienceDto):Observable<any>{
    return this.http.put<IExperience>(this.endPoint+'actualizar/'+id,experience);
  }

  uploadImage(archivo:File, id:number):Observable<IExperience>{
    let data = new FormData;
    data.append("file",archivo);
    return this.http.post<IExperience>(this.endPoint+"upload/"+id,data);
   }

   getImagen(id:number):Observable<any>{
    return this.http.get<any>(this.endPoint+"image/"+id);
   }
}
