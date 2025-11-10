import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zkit } from '@app/models/zkit';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZkitService {
  endpoint = "";
  constructor(private http: HttpClient) {
    this.endpoint = environment.apiUrl+"zkit/";
  }

  getFamilias(){
    return this.http.get<any>(this.endpoint + "familias");
  }

  getProductosByFamilias(familia: string){
    return this.http.get<Zkit[]>(this.endpoint + "productosFamilia?familia=" + familia);
  }

  generarMovimientoZkit(productos: any[], ){
    return this.http.post<any>(this.endpoint + "nuevo_movimiento", productos);
  }

}
