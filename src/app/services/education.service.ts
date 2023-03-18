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

  //endPoint='http://localhost:3000/education';
  endPoint='http://localhost:8080/educacion/';
  //endPoint = 'https://porft-back.onrender.com/educacion/';

  getEducationData():Observable<IEducation[]>{
    return this.http.get<IEducation[]>(this.endPoint);
  }

  createEducation(data:IEducationDto):Observable<IEducation>{
    return this.http.post<IEducation>(this.endPoint+'crear',data);
  }

  deleteEducation(id:number):Observable<any>{
    return this.http.delete<any>(this.endPoint+'eliminar/'+id);
  }

  uploadImage(file:File,id:number):Observable<any>{
    let data = new FormData();
    data.append('file',file);
    return this.http.post<any>(this.endPoint+'upload/'+id,data);
  }

  updateEducation(body:IEducationDto,eduaction_id:number):Observable<IEducation>{
    return this.http.put<IEducation>(this.endPoint+'actualizar/'+eduaction_id,body);
  }

}
