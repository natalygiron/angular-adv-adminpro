import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/service/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
                private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ termino }) => {
          this.busquedaGlobal(termino)
        })
  }

  busquedaGlobal( termino: string) {

    this.busquedasService.busquedaGlobal(termino)
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.hospitales;
        })
        
  }


}