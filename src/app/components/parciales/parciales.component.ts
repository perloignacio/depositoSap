import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { parciales } from '@app/models/parciales';
import { BalanzaService } from '@app/services/balanza.service';
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

  nota:any = {};
  clase:string ="";
  peso:number = 0;
  displayedColumns: string[] = ['Fecha','Peso','Acciones'];
  dataSource: MatTableDataSource<parciales>;
  parciales:parciales[] = [];
  totales: number = 0;
  constructor(public svcShared:SharedService, private svcBalanza:BalanzaService, private svcNotas:NotasvtasService, private dialogRef: MatDialogRef<ParcialesComponent>) { 
    this.nota = this.svcShared.objModal.nota;
    this.refrescar();
  }

  ngOnInit(): void {
  }

  refrescar(){
    this.svcNotas.obtenerParciales(this.svcShared.objModal.viaje,this.svcShared.objModal.nota.numero ).subscribe((lista)=>{
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
  
  tomarpesada(){
    this.svcBalanza.lectura(this.svcShared.objModal.balanza).pipe(first()).subscribe(lectura => {
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
    parcial.viaje = this.svcShared.objModal.viaje;
    
    this.svcNotas.nuevoParcial(parcial).subscribe((b)=>{
       this.refrescar();
    })
   
  }
  
}
