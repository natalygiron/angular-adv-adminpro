import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { ProgressComponent } from "./progress/progress.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { BusquedasComponent } from "./busquedas/busquedas.component";
import { AdminGuard } from "../guards/admin.guard";

const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: { titutlo: 'Dashboard'} },
  {path: 'progress', component: ProgressComponent, data: { titutlo: 'Progress'}},
  {path: 'grafica1', component: Grafica1Component, data: { titutlo: 'Grafica1'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: { titutlo: 'AccountSettings'}},
  {path: 'buscar/:termino', component: BusquedasComponent, data: { titutlo: 'Búsquedas'}},
  {path: 'promesas', component: PromesasComponent, data: { titutlo: 'Data promesas'}},
  {path: 'rxjs', component: RxjsComponent, data: { titutlo: 'PromesasRxjs'}},
  {path: 'perfil', component: PerfilComponent, data: { titutlo: 'Perfil de usuario'}},
  // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  
  // Mantenimientos
  {path: 'medicos', component: MedicosComponent, data: { titutlo: 'Mantenimiento de médicos'}},
  {path: 'medico/:id', component: MedicoComponent, data: { titutlo: 'Mantenimiento de médico'}},
  {path: 'hospitales', component: HospitalesComponent, data: { titutlo: 'Mantenimiento de hospitales'}},
  
  //Rutas de Admin
  {path: 'usuarios', canActivate: [AdminGuard] ,component: UsuariosComponent, data: { titutlo: 'Mantenimiento de usuario'}},
]




@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
