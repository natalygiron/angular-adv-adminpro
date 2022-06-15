import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || 'test50@gmail.com', [Validators.required, Validators.email] ],
    password: ['123456', [Validators.required, Validators.minLength(6)] ],
    remember: [ false ]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) { }

  login(){
    // this.router.navigateByUrl('/');
    this.usuarioService.login( this.loginForm.value )
      .subscribe(resp => {
        if ( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
