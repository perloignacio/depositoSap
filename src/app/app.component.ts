import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuarios } from 'src/app/models/usuarios';
import { SharedService } from './services/shared.service';

import { CalculadoraComponent } from './components/calculadora/calculadora.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: Usuarios;
  logueado:boolean=false;
  cssLogin="";
  public nombre:string;
  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: any) {
    //localStorage.clear();
  }
  constructor(
      private router: Router,
      public authenticationService: AuthenticationService,
      public svcShared:SharedService,
      private dialog: MatDialog
  ) {
      if(!localStorage.getItem("currentUser"))
      {
        this.router.navigate(['/login']);
        this.svcShared.cssLogin="login";
      }else{
        this.logueado=true;
        this.svcShared.cssLogin="";
      }
      /*this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
        if (x==null){
          this.router.navigate(['/login']);
          this.cssLogin="login";
        }else{
          this.logueado=true;
          this.cssLogin="";
        }
      });*/


  }

  calculadora(){

    let dialogRef = this.dialog.open(CalculadoraComponent, {
      height: '600px',
      width: '800px',
    });
  }


  logout() {
      this.authenticationService.logout();
      this.logueado=false;
      this.svcShared.cssLogin="login";
      this.router.navigate(['/']);
  }
}
