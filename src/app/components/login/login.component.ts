import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavesService } from '@app/services/naves.service';
import { Naves } from '@app/models/naves';
import { SharedService } from '@app/services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  naves:Naves[];
  public usuario:string;
  public contra:string;
  public nave:Naves;

  constructor(

      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private svcNaves:NavesService,
      public svcShared:SharedService
  ) {
      // redirect to home if already logged in

      if (this.authenticationService.currentUserValue) {

          //this.router.navigate(['/viajes']);
      }
  }

  ngOnInit() {


      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields


  enviar() {




    this.loading = true;
      this.authenticationService.login(this.usuario,this.contra)
          .pipe(first())
          .subscribe(
              data => {

                  this.router.navigate(["/balanza"]);
                  this.svcShared.cssLogin="";
              },
              error => {

                  this.error = error;
                  this.loading = false;
              });
  }
}
