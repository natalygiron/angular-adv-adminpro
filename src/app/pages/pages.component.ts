import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { SidebarService } from '../service/sidebar.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  // public linkTheme = document.querySelector("#theme");

  constructor(private settingService: SettingService,
              private sidebarService: SidebarService) { }

  ngOnInit(): void {
    //  Toma el valor de theme del localStorage. Si no lo encuentra, pone el thema a megna.
    // const url = localStorage.getItem('theme') || `./assets/css/colors/megna-dark.css`;
    // this.settingService.linkTheme?.setAttribute('href',url);
    customInitFunctions();

    this.sidebarService.cargarMenu();
  }

}
