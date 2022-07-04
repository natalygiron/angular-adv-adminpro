import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "../guards/auth.guard";

import { PagesComponent } from "./pages.component";
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

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          {path: '', component: DashboardComponent, data: { titutlo: 'Dashboard'} },
          {path: 'progress', component: ProgressComponent, data: { titutlo: 'Progress'}},
          {path: 'grafica1', component: Grafica1Component, data: { titutlo: 'Grafica1'}},
          {path: 'account-settings', component: AccountSettingsComponent, data: { titutlo: 'AccountSettings'}},
          {path: 'promesas', component: PromesasComponent, data: { titutlo: 'Data promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: { titutlo: 'PromesasRxjs'}},
          {path: 'perfil', component: PerfilComponent, data: { titutlo: 'Perfil de usuario'}},
          // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
          
          // Mantenimientos
          {path: 'usuarios', component: UsuariosComponent, data: { titutlo: 'Mantenimiento de usuario'}},
          {path: 'medicos', component: MedicosComponent, data: { titutlo: 'Mantenimiento de médicos'}},
          {path: 'medico/:id', component: MedicoComponent, data: { titutlo: 'Mantenimiento de médico'}},
          {path: 'hospitales', component: HospitalesComponent, data: { titutlo: 'Mantenimiento de hospitales'}},
         
        ]
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}

// tendra la definicion de las rutas internas a un modulo
