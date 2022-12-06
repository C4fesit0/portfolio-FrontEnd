import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../interfaces/IProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiURL='http://localhost:3000/profile';

  constructor(private http:HttpClient) {
   }

   getProfileData():Observable<IProfile>{
    return this.http.get<IProfile>(this.apiURL);
   }
}
