import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Naves } from '@app/models/naves';
import { notavta } from '@app/models/notavta';
import { Viajes } from '@app/models/viajes';
import { NotasvtasService } from '@app/services/notasvtas.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-notas-venta',
  templateUrl: './notas-venta.component.html',
  styleUrls: ['./notas-venta.component.css']
})
export class NotasVentaComponent implements AfterViewInit {
  viaje:string="";
  displayedColumns: string[] = ['Empresa', 'Fecha', 'Numero', 'Cliente','Nombre','Kilos','Ruteo'];
  dataSource: MatTableDataSource<notavta>;
  nave:Naves;
  cargandoPagina:boolean=true;
  porcentaje:number=0;
  public objViajes:Viajes;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatLabel) label: MatLabel;
  @ViewChild(MatFormField) field: MatFormField;
  constructor(private svcNotas:NotasvtasService,private route: ActivatedRoute,private router: Router) {
    var retrievedObject = localStorage.getItem('nave');
    this.nave=JSON.parse(retrievedObject);

    retrievedObject = localStorage.getItem('viaje');
    if(!retrievedObject){
      this.router.navigate(["/viajes"])
    }
    this.objViajes=JSON.parse(retrievedObject);

    this.svcNotas.getByFechaNumero(this.objViajes.fecha,this.objViajes.numero,this.nave.codigo).pipe(first()).subscribe(notavta => {
      this.dataSource = new MatTableDataSource(notavta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      var lista:number=0;
      var pendiente:number=0;
      var total:number=0;
      notavta.forEach(nta => {
        lista+=nta.listas;
        pendiente+=nta.pendientes;

      });
      total=lista+pendiente;
      this.porcentaje=(lista*100)/total;
      this.cargandoPagina=false;
    });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {

  }

  verDetalle(row:notavta){

    this.router.navigate(['/notasventadetalle'], { queryParams: { id:row.numero,empresa:row.empresa }});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
