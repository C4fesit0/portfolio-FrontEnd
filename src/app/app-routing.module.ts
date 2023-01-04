//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainComponent } from './components/main/main.component';

//Guard
import { LogeadoGuard } from './guards/logeado.guard';

const routes:Routes =[
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },{
    path:'home',
    component:MainComponent,
    children:[
      {
        path:'edit',
        component:MainComponent,
        canActivate: [LogeadoGuard]
      },
    ]
  },
  {
    path:'login',
    component:LoginFormComponent,
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
