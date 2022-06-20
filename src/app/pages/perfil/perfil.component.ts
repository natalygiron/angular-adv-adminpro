import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup = new FormGroup({});
  public usuario: Usuario;
  public imagenSubir: File | any;
  public imgTemp: string | any;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {
    this.usuario = usuarioService.usuario;
    
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [Validators.required, Validators.email]],

    })
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( () => {
        const { nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg , 'error');
      });
  }

  cambiarImagen(event: any){
    var file: File = event.target.files[0];
    this.imagenSubir = file;

    if( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    return reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
  }

  subirImagen() {
    const uid = this.usuario.uid || '' //para que no salga undefined
    this.fileUploadService
      .actualizarFoto( this.imagenSubir , 'usuarios', uid )
      .then( img =>{ 
        this.usuario.img = img
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }).catch( err => {
        Swal.fire('Error', 'No se pudo subir la imagen' , 'error');
      });
  }

}
