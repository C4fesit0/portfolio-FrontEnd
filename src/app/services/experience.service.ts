import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExperience } from '../interfaces/IExperience.interface';
import { IExperienceDto } from '../interfaces/IExperienceDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  //apiURL = 'http://localhost:3000/experience';
  apiURL = 'http://localhost:8080/experiencia/';
  constructor(private http:HttpClient) { }

  getExperienceData():Observable<IExperience[]>{
    return this.http.get<IExperience[]>(this.apiURL);
  }

  createExperience(data:IExperienceDto):Observable<any>{
    return this.http.post<any>(this.apiURL+"crear",data);
  }

  deleteExperience(id:number):Observable<any>{
    return this.http.delete<any>(this.apiURL+'eliminar/'+id);
  }

}
