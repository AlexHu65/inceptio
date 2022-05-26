import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/IUsers';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {

  loggedUser:Usuario = {
    id: 0,
    email: "",
    name: "",
    avatar: ""
  };

  constructor() { 
     //validate user
     let local = JSON.parse(localStorage.getItem('user')  || '{}');
     if(local){
       this.loggedUser = {
         email: local.email,
         id: local.id,
         name: local.name,
         avatar: local.avatar
       }
     }
  }

  logout(){

    this.loggedUser = {
      id: 0,
      email: "",
      name: "",
      avatar: ""
    };

    localStorage.removeItem('user');
  }


}
