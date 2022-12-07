import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEducation } from '../interfaces/IEducation.interface';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http:HttpClient) { }

  apiURL='http://localhost:3000/education';

  getEducationData():Observable<IEducation[]>{
    return this.http.get<IEducation[]>(this.apiURL);
  }

}
