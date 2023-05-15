import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etiqueta } from '@app/models/etiqueta';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImprimirService {

  endpoint = "";
  constructor(private http: HttpClient) {
    this.endpoint = environment.apiUrl+"imprimir/";
  }
  imprimir(eti:Etiqueta) {
    return this.http.post<string>(this.endpoint+'print',eti);
  }

}
