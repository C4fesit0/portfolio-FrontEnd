//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

//Componentes
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BodyComponent } from './components/body/body.component';

const routes:Routes =[
  {
    path:'',
    component:BodyComponent
  },
  {
    path:'login',
    component:LoginFormComponent
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
