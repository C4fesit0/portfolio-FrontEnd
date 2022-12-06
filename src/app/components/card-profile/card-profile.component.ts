import { Component, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/IProfile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  profile!:IProfile;
  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe((data)=>{
      this.profile=data;
    })
  }

}
