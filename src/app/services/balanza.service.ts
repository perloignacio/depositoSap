import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { balanza } from '@app/models/balanza';
import { lectura } from '@app/models/lectura';
import { notavta } from '@app/models/notavta';
import { NotaVentaDetalle } from '@app/models/notavta-detalle';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanzaService {

  endpoint = "";
  constructor(private http: HttpClient) {
    this.endpoint = environment.apiUrl+"balanza/";
  }
  lectura(idbalanza:number) {
    return this.http.get<lectura>(this.endpoint+'lectura?idbalanza='+idbalanza);
  }
  todas() {
    return this.http.get<balanza[]>(this.endpoint+'todas');
  }


}
