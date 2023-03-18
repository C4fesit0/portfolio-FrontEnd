import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from '../interfaces/IProject.interface';
import { IProjectDto } from '../interfaces/IProjectDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //apiURL='http://localhost:8080/proyecto/listar';
  endPoint = 'https://porft-back.onrender.com/proyecto/'
  //endPoint = "http://localhost:8080/proyecto/";
  constructor(private http:HttpClient) { }

  getProjects():Observable<IProject[]>{
    return this.http.get<IProject[]>(this.endPoint+"listar");
  }

  createProject(data:IProjectDto):Observable<IProject>{
    return this.http.post<IProject>(this.endPoint+"crear",data);
  }

  uploadImage(imagen:File,id:number):Observable<any>{
    let body = new FormData();
    body.append('file',imagen);
    body.append('id',id.toString());
    return this.http.post<File>(this.endPoint+'upload',body);
  }

  deleteProject(id:number){
    return this.http.delete<number>(this.endPoint+'delete/'+id);
  }

  updateProject(data:IProjectDto,id:number):Observable<any>{
    return  this.http.put<IProjectDto>(this.endPoint+"update/"+id,data);
  }

}
