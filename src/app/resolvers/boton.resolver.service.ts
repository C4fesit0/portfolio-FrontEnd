import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({providedIn:'root'}
) export class BotonResolverService implements Resolve<any> {

  constructor(private router:Router){}

  boton:any;

  resolve():Observable<any> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
           event.url;
          console.log(event);
          if(event.url=='/login'){
            this.boton.url = '/';
            this.boton.texto='Home';
            this.boton.class='btn-danger';
          }else if(event.url=='/'){
            this.boton.url='/login';
            this.boton.texto='Login';
            this.boton.class='btn-primary';
          }
      }
    });
      return this.boton;
  }
}
