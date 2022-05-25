import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from "../interfaces/IUsers";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      let local = JSON.parse(localStorage.getItem('user')  || '{}');
      
      if(local[0]){

        let user:Usuario = {
          email: local.email,
          id: local.id,
          name: local.name,
          avatar: local.avatar
        }

        if(user.email){
          return false;
        }

      }

      return true;
  }
  
}
