import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../interfaces/ISkill.interface';
import { ISkillDto } from 'src/app/interfaces/ISkillDto.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  //apiURL='http://localhost:8080/tecnologia/listar';
  endPoint = 'http://localhost:8080/tecnologia/'
  constructor(private http:HttpClient) { }

  getSkills() : Observable<ISkill[]>{
    return this.http.get<ISkill[]>(this.endPoint+'listar');
  }

  createSkill(body:ISkillDto) :Observable<any>{
    return this.http.post<ISkillDto>(this.endPoint+'crear',body);
  }

  deleteSkill(id:number):Observable<any>{
    return this.http.delete(this.endPoint+'eliminar/'+id);
  }

}
