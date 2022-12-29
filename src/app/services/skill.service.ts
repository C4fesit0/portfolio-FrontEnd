import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../interfaces/ISkill.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  //apiURL = 'http://localhost:3000/skills';
  apiURL='http://localhost:8080/tecnologia/listar';
  constructor(private http:HttpClient) { }

  getSkills() : Observable<ISkill[]>{
    return this.http.get<ISkill[]>(this.apiURL);
  }

}
