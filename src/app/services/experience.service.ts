import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExperience } from '../interfaces/IExperience.interface';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  apiURL = 'http://localhost:3000/experience';

  constructor(private http:HttpClient) { }

  getExperienceData():Observable<IExperience[]>{
    return this.http.get<IExperience[]>(this.apiURL);
  }
}
