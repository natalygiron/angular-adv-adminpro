import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/service/busquedas.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = []; // Para cargar los usuarios de la ultima busqueda en la tabla cuando se tiene vacio el campo de búsqueda
  
  public imgSubs: Subscription | undefined;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioSerivce: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( 
        img => this.cargarUsuarios()
      );
  }
  
  cargarUsuarios() {
    this.cargando = true;

    this.usuarioSerivce.cargarUsuarios(this.desde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    } else if ( this.desde > this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ){

    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    return this.busquedaService.buscar('usuarios',termino)
                    .subscribe( resp =>{ // para solucionar tipo tambien se puede con (resp: Usuario[])
                      this.usuarios = resp || Usuario[''];
                    });
  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioSerivce.uid ){ 
      return Swal.fire('Error','No puedes borrarte a ti mismo.', 'error')
    }
    
    return Swal.fire({
      title: 'Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar usuario'
    }).then((result) => {
      if (result.value) {
        this.usuarioSerivce.eliminarUsuario(usuario)
            .subscribe( resp => {
              Swal.fire(
                'Eliminado!',
                `El usuario ${usuario.nombre} ha sido eliminado`,
                'success'
                );
                this.cargarUsuarios();

            })
        
      }
    })
  }

  cambiarRole( usuario: Usuario){
    this.usuarioSerivce.guardarUsuario(usuario)
      .subscribe( resp => {
        // console.log(resp)
      })
  }

  abrirModal(usuario: Usuario){
    const uid = usuario.uid || '';
    // console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', uid, usuario.img );
  }

}
