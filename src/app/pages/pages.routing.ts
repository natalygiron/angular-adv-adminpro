import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { ProgressComponent } from "./progress/progress.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent, data: { titutlo: 'Dashboard'} },
          {path: 'progress', component: ProgressComponent, data: { titutlo: 'Progress'}},
          {path: 'grafica1', component: Grafica1Component, data: { titutlo: 'Grafica1'}},
          {path: 'account-settings', component: AccountSettingsComponent, data: { titutlo: 'AccountSettings'}},
          {path: 'promesas', component: PromesasComponent, data: { titutlo: 'Data promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: { titutlo: 'PromesasRxjs'}},
         // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}

// tendra la definicion de las rutas internas a un modulo
