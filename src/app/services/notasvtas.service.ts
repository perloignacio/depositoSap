import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { notavta } from '@app/models/notavta';
import { NotaVentaDetalle } from '@app/models/notavta-detalle';
import { Productos } from '@app/models/productos';
import { TiposFaltante } from '@app/models/tiposfaltantes';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Preparacion } from '@app/models/preparacion';
import { parciales } from '@app/models/parciales';
@Injectable({
  providedIn: 'root'
})
export class NotasvtasService {

  endpoint = "";
  constructor(private http: HttpClient,private svcUsuario:AuthenticationService) {
    this.endpoint = environment.apiUrl+"notasventas/";
  }
  getByFechaNumero(fecha:Date,Numero:string,Nave:string) {
    return this.http.get<notavta[]>(this.endpoint+'byfechanumero?fecha='+fecha+'&numero='+Numero+'&nave='+Nave);
  }
  getOne(Numero:number) {
    return this.http.get<notavta>(this.endpoint+'una?numero='+Numero);
  }
  detalle(Numero:number,Nave:string,Viaje:string) {
    return this.http.get<NotaVentaDetalle[]>(this.endpoint+'detalle?numero='+Numero.toString()+'&nave='+Nave+'&viaje='+Viaje).pipe(
      map(
        (data: NotaVentaDetalle[]) => data.map(event => {
          // may need to coerce string to Date types
          return new NotaVentaDetalle(event)
         })
      )
    );
  }
  faltantes() {
    return this.http.get<TiposFaltante[]>(this.endpoint+'tiposfaltantes');

  }
  guardar(preparaciones:Preparacion[]) {
    return this.http.post<string>(this.endpoint+'guardar',preparaciones);
  }

  limpiar(preparaciones:Preparacion) {
    return this.http.post<string>(this.endpoint+'limpiar',preparaciones);
  }

  nuevoParcial(parcial:parciales) {
    return this.http.post<boolean>(this.endpoint+'parcial',parcial);
  }

   borraParcial(id:string) {
    return this.http.post<boolean>(this.endpoint+'borraParcial/'+id,null);
  }

  obtenerParciales(viaje:string, nota:string) {
    return this.http.post<parciales[]>(this.endpoint+`obtenerParciales/${viaje}/${nota}`,null);
  }
}
