import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login.interface';
import { registerForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario = new Usuario('nataly','nataly@gmail.com');

  constructor( private http: HttpClient,
               private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

  validarToken(){

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const {
          email, google, nombre, rol, img, uid 
        } = resp.usuario;

        this.usuario = new Usuario(nombre,email, '', google, img, rol, uid)
        localStorage.setItem( 'token', resp.token )
        return true;
      }),
      // map( resp => true),
      catchError( error => of(false) )
    );

  }

  crearUsuario( formData: registerForm ) {
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string}) {

    data = { ...data, role: this.usuario.role || 'USER_ROLE'}
    // data = { ...data, role: 'USER_ROLE' };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers )

  }

  login( formData: LoginForm ) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
              .pipe(
                map( resp => {
                  const usuarios = resp.usuarios.map( 
                    user => new Usuario(user.nombre, user.email,'', user.google , user.img, user.role, user.uid )
                    )
                  return {
                    total: resp.total,
                    usuarios
                  };
                })
              )
  }

  eliminarUsuario( usuario: Usuario ) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario( usuario: Usuario ) {
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid}`, usuario, this.headers);
  }


}