import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Etiqueta } from '@app/models/etiqueta';
import { NotaVentaDetalle } from '@app/models/notavta-detalle';
import { parciales } from '@app/models/parciales';
import { AuthenticationService } from '@app/services/authentication.service';
import { BalanzaService } from '@app/services/balanza.service';
import { ImprimirService } from '@app/services/imprimir.service';
import { NotasvtasService } from '@app/services/notasvtas.service';
import { SharedService } from '@app/services/shared.service';
import { first } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-parciales',
  templateUrl: './parciales.component.html',
  styleUrls: ['./parciales.component.css']
})
export class ParcialesComponent implements OnInit {

  notaDetalle:NotaVentaDetalle ;
  clase:string ="";
  peso:number = 0;
  displayedColumns: string[] = ['Fecha','Peso', 'Usuario' ,'Acciones'];
  dataSource: MatTableDataSource<parciales>;
  parciales:parciales[] = [];
  totales: number = 0;
  esadmin:boolean = false;
  constructor(public svcShared:SharedService, private svcBalanza:BalanzaService, private svcNotas:NotasvtasService, private dialogRef: MatDialogRef<ParcialesComponent>, private svcImpimir:ImprimirService, private svcAutenticate:AuthenticationService) { 
    this.notaDetalle = this.svcShared.objModal.notaDetalle;
    this.refrescar();
    if(this.svcAutenticate.currentUserValue.RolDeposito=="depositoadmin"){
        this.esadmin=true;
      }
  }

  ngOnInit(): void {
  }

  refrescar(){
    this.svcNotas.obtenerParciales(this.svcShared.objModal.viaje.numero,this.svcShared.objModal.nota.numero ).subscribe((lista)=>{
      this.parciales = lista;
      this.totales = 0;
      this.parciales.forEach((p)=>{
        this.totales += p.peso;
      })
      this.dataSource = new MatTableDataSource(lista);

    })
   
  }
  limpiar(id){
     this.peso = 0;
     this.svcNotas.borraParcial(id).subscribe((b)=>{
       this.refrescar();
    })
  }
  
  imprimir(row:parciales){
    const tmpDetalles = { ...this.notaDetalle}
    let eti:Etiqueta=new Etiqueta();
    eti.nave=this.svcShared.objModal.nave;
    eti.nota=this.svcShared.objModal.nota;
    eti.viaje=this.svcShared.objModal.viaje;
    eti.productos=[];
    eti.parcial = true;
    tmpDetalles.cantprep = row.peso;
    eti.productos.push(tmpDetalles as NotaVentaDetalle);
    //console.log(eti);
    this.svcImpimir.imprimir(eti).pipe(first()).subscribe(lbl => {
      if(lbl=='Error'){
        alert("Error al imprimir etiqueta. Recuerde que debe guardar la preparacion antes de imprimir");
      }else{
        alert("Imprimiendo");
      }
    },(err)=>{
      console.log(err);
    });
  }
  tomarpesada(){
    this.svcBalanza.lectura(this.svcShared.objModal.balanza.Id).pipe(first()).subscribe(lectura => {
      if(lectura){
        if(lectura.Status=="E"){
          
          this.agregarParcial(lectura.Valor);
          this.peso=lectura.Valor;
          this.clase="text-success";
          
        }else{
          this.peso=lectura.Valor;
          this.clase="text-danger";
        }
      }else{
        alert("Ocurrio un error al tomar lectura");
      }
    });

    /*
    const pesoLocal = Math.floor(Math.random() * 100) + 1;
    this.peso = pesoLocal
    this.clase = "text-success";
    this.agregarParcial(pesoLocal);
    */
  }
  
  cerrar(){
      this.totales = 0;
      this.parciales.forEach((p)=>{
        this.totales += p.peso;
      })
      this.dialogRef.close({ resultado: 'ok', valor: this.totales });

  }

  cancelar(){
      this.totales = 0;
      this.dialogRef.close(null);

  }
  agregarParcial(peso:number){
    const parcial:parciales = new parciales();
    parcial.fecha = new Date();
    parcial.id = uuidv4();
    parcial.nota = this.svcShared.objModal.nota.numero;
    parcial.peso = peso;
    parcial.viaje = this.svcShared.objModal.viaje.numero;
    
    this.svcNotas.nuevoParcial(parcial).subscribe((b)=>{
       this.refrescar();
    })
   
  }
  
}
