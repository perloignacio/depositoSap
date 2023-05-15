import { Naves } from "./naves";
import { notavta } from "./notavta";
import { NotaVentaDetalle } from "./notavta-detalle";
import { Productos } from "./productos";
import { Viajes } from "./viajes";

export class Etiqueta{
  viaje:Viajes;
  nota:notavta;
  nave:Naves;
  productos:NotaVentaDetalle[]=[];  
}
