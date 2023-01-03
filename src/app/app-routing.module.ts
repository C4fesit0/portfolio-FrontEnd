//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

//Componentes
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BodyComponent } from './components/body/body.component';
import { MainComponent } from './components/main/main.component';
import { LogeadoGuard } from './guards/logeado.guard';
import { BotonResolverService } from './resolvers/boton.resolver.service';

const routes:Routes =[
  {
    path:'',
    component:BodyComponent,
    children:[
      {
        path:'',
        component:MainComponent,
        resolve: {boton : BotonResolverService}
      },
      {
        path:'login',
        component:LoginFormComponent,
        resolve: {boton : BotonResolverService}
      },
      {
        path:'edit',
        component:MainComponent,
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
