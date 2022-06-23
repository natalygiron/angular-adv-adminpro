import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public _ocultarModal: boolean = false;
  public tipo: string | any;
  public id: string = '';
  public img:  string | any;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocualtarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: "usuarios" | "medicos" | "hospitales",
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if( img.includes('https') ){
      this.img = img;
      console.log('uwu');
    } else {
      this.img = `${base_url}/uploads/${tipo}/${img}`;
      console.log('owo ', this.img);
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
