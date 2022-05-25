import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { SettingService } from 'src/app/service/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector("#theme");
  public links: NodeListOf<Element> = document.querySelectorAll('.selector');;

  constructor( private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  changeTheme( theme: string){
    
    this.settingService.changeTheme(theme);
  }


}
