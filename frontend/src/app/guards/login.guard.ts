import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from "../interfaces/IUsers";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      let local = JSON.parse(localStorage.getItem('user')  || '{}');

      if(local.email !== undefined){

        let user:Usuario = {
          email: local.email,
          id: local.id,
          name: local.name,
          avatar: local.avatar
        }

        if(user.email){
          this.router.navigate(['/']);
          return false;
        }

      }else{
        return true;
      }

      return true;
  }
  
}
