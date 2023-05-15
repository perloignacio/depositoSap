import { Injectable } from '@angular/core';
import { NotaVentaDetalle } from '@app/models/notavta-detalle';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  NotaVentaDetalle:NotaVentaDetalle[]=[];
  cssLogin:string="";
  constructor() { }
}
