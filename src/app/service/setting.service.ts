import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public linkTheme = document.querySelector("#theme");

  constructor() { 
    const url = localStorage.getItem('theme') || `./assets/css/colors/megna-dark.css`;
    this.linkTheme?.setAttribute('href',url);
  }

  changeTheme( theme: string){
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href',url);
    // lo grabamos en el local storage
    localStorage.setItem('theme',url); 

    this.checkCurrentTheme(); // para que ocurra cada vez que hagan click
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }

}
