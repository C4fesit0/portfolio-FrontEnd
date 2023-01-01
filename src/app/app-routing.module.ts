//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

//Componentes
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BodyComponent } from './components/body/body.component';
import { MainComponent } from './components/main/main.component';

const routes:Routes =[
  {
    path:'',
    component:BodyComponent,
    children:[
      {
        path:'',
        component:MainComponent
      },
      {
        path:'login',
        component:LoginFormComponent
      },
      {
        path:'edit',
        component:MainComponent
      },
    ]
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
