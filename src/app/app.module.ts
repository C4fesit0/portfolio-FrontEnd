import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { CardExperienceComponent } from './components/card-experience/card-experience.component';
import { CardProjectComponent } from './components/card-project/card-project.component';
import { ButtonComponent } from './components/button/button.component';
import { ProjectTagComponent } from './components/card-project/project-tag/project-tag.component';
import { BodyComponent } from './components/body/body.component';
import { CardSkillsComponent } from './components/card-skills/card-skills.component';
import { CardEducationComponent } from './components/card-education/card-education.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardProfileComponent,
    CardExperienceComponent,
    CardProjectComponent,
    ButtonComponent,
    ProjectTagComponent,
    BodyComponent,
    CardSkillsComponent,
    CardEducationComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
