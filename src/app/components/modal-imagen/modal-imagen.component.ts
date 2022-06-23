import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File | any;
  public imgTemp: string | any;

  constructor( public modalImagenService: ModalImagenService,
                public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
      // console.log(reader.result);
    }
  }

  subirImagen() {
    const id = this.modalImagenService.id || '' //para que no salga undefined
    const tipo = this.modalImagenService.tipo || 'usuarios' //para que no salga undefined
    this.fileUploadService
      .actualizarFoto( this.imagenSubir , tipo, id )
      .then( img =>{ 
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        Swal.fire('Error', 'No se pudo subir la imagen' , 'error');
      });
  }



}
