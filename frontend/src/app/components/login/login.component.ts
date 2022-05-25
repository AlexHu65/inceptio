import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Usuario, LoginUser } from "../../interfaces/IUsers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  usuario:any = null;
  formLogin:any = null;

  constructor(private service:UserService) {
    this.loadForm();    
  }

  login(params:LoginUser){
    this.service.login(params).subscribe((data) => {

      if(data){
        this.usuario = data;
        localStorage.setItem('user', JSON.stringify(this.usuario ));
        window.location.href = "/";

      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al iniciar sesion, valida usuario y contrasena',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

    
  }


  loadForm(){
    this.formLogin  = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('')
    });
  }


  get form(){
    return this.formLogin.controls;
  }

  onSubmit(){

    let data = {
      email: this.form.email.value,
      password: this.form.password.value
    };

    this.login(data);

  }

}
