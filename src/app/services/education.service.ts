import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEducation } from '../interfaces/IEducation.interface';
import { IEducationDto } from '../interfaces/IEducationDto.interface';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http:HttpClient) { }

  //apiURL='http://localhost:3000/education';
  endPoint='http://localhost:8080/educacion/';


  getEducationData():Observable<IEducation[]>{
    return this.http.get<IEducation[]>(this.endPoint);
  }

  createEducation(data:IEducationDto):Observable<IEducation>{
    return this.http.post<IEducation>(this.endPoint+'crear',data);
  }

  deleteEducation(id:number):Observable<any>{
    return this.http.delete<any>(this.endPoint+'eliminar/'+id);
  }



}
