//Modulos
import { LOCALE_ID ,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';

//Componentes
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
import { ExperienceComponent } from './components/card-experience/experience/experience.component';
import { EducationComponent } from './components/card-education/education/education.component';

import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");

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
    CardEducationComponent,
    ExperienceComponent,
    EducationComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
