import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/service/busquedas.service';
import { MedicoService } from 'src/app/service/medico.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public imgSubs: Subscription;

  constructor( private medicoService: MedicoService,
                private modalImagenService: ModalImagenService,
                private busquedaService: BusquedasService) { };
  
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(100))
        .subscribe( img => this.cargarMedicos());
  }

  cargarMedicos() {
    console.log('carrrgando')
    this.cargando = true;
    this.medicoService.cargarMedicos()
        .subscribe( medicos => {
          this.cargando = false;
          this.medicos = medicos;
        })
  }

  abrirModal( medico: Medico) {
    const id = medico._id || '';
    this.modalImagenService.abrirModal('medicos', id, medico.img );
  }

  buscar( termino: string ){
    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino)
        .subscribe( resp => {
          this.medicos = resp;
        });
  }

  borrarMedico( medico: Medico ){

    return Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar médico'
    }).then((result) => {
      if (result.value) {
        this.medicoService.eliminarMedico(medico)
            .subscribe( resp => {
              Swal.fire(
                'Eliminado!',
                `El médico ${medico.nombre} ha sido eliminado`,
                'success'
                );
                this.cargarMedicos();

            })
        
      }
    })
    
  }

}
