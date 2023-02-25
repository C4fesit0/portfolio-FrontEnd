import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from '../interfaces/IProject.interface';
import { IProjectDto } from '../interfaces/IProjectDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //apiURL = 'http://localhost:3000/projects';
  //apiURL='http://localhost:8080/proyecto/listar';

  endPoint = "http://localhost:8080/proyecto/";
  constructor(private http:HttpClient) { }

  getProjects():Observable<IProject[]>{
    return this.http.get<IProject[]>(this.endPoint+"listar");
  }

  createProject(data:IProjectDto):Observable<IProject>{
    return this.http.post<IProject>(this.endPoint+"crear",data);
  }

}
