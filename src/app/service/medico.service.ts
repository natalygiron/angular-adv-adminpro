import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  crearMedico( medico: { nombre: string, hospital: string} ) {
    const url = `${base_url}/medico` 
    return this.http.post(url, medico, this.headers )
  }

  cargarMedicos(  ) {
    const url = `${base_url}/medico`;
    return this.http.get(url, this.headers)
              .pipe(
                map( (resp: { ok: boolean, medicos: Medico[]} ) => resp.medicos)
              )
  }

  eliminarMedico( medico: Medico ) {
    const url = `${base_url}/medico/${medico._id}`;
    return this.http.delete(url, this.headers);
  }
  
  actualizarMedico( medico: Medico ) {
    const url = `${ base_url }/medico/${ medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  obtenerMedicoPorId (id: string) {
    const url = `${base_url}/medico/${id}`;
    return this.http.get(url, this.headers )
              .pipe(
                map( (resp: {ok:boolean, medico: Medico}) => resp.medico)
              )
  }

}
