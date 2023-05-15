import { Component } from '@angular/core';
import { first } from 'rxjs/operators';


import { AuthenticationService } from 'src/app/services/authentication.service';

import { ViajesService } from 'src/app/services/viajes.service';
import { Viajes } from 'src/app/models/viajes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading = false;
  viajes: Viajes[];
  constructor(private viajesService: ViajesService) { }

  ngOnInit(): void {
    this.loading = true;
    /*this.viajesService.getAll().pipe(first()).subscribe(viajes => {
        this.loading = false;
        this.viajes = viajes;
    });
    */
  }

}
