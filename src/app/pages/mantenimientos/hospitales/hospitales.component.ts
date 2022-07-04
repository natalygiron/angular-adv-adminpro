import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/service/hospital.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import { BusquedasService } from 'src/app/service/busquedas.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription | undefined;

  constructor( private hospitalService: HospitalService,
                private modalImagenService: ModalImagenService,
                private busquedaService: BusquedasService  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( 
        img => this.cargarHospitales()
      );
  }

  buscar( termino: string ){

    if(termino.length === 0){
      return this.cargarHospitales();
    }

    return this.busquedaService.buscar('hospitales',termino)
                    .subscribe( resp =>{
                      this.hospitales = resp;
                    });
  }

  cargarHospitales() {
    this.cargando = false;
    
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando= false;
        this.hospitales = hospitales;
      })
  }

  guardarCambios( hospital: Hospital) {
    const _id = hospital._id || '';
    this.hospitalService.actualizarHospital( _id, hospital.nombre)
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success')
        })
  }

  eliminarHospital( hospital: Hospital){
    const _id = hospital._id || '';
    this.hospitalService.borrarHospital(_id)
        .subscribe( resp => {
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.nombre, 'success')
        })
  }

  async abrirSweetAlert() {
    let {value} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingresa el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true

    })
    if(!value) value = '';
    if(value.trim().length > 0) {
      this.hospitalService.crearHospitales( value )
          .subscribe((resp: any) => {  
            this.hospitales.push(resp.hospital)
          })
    }
  }

  abrirModal(hospital: Hospital) {
    const id = hospital._id || '';
    this.modalImagenService.abrirModal('hospitales', id, hospital.img );
  }

}
