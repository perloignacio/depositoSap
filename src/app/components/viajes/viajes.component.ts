import { ViewChild } from '@angular/core';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Naves } from '@app/models/naves';

import { Viajes } from '@app/models/viajes';
import { ViajesService } from '@app/services/viajes.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements AfterViewInit   {

  displayedColumns: string[] = ['fecha', 'numero', 'prioridad', 'kilos'];
  dataSource: MatTableDataSource<Viajes>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatLabel) label: MatLabel;
  @ViewChild(MatFormField) field: MatFormField;



  nave:Naves;
  constructor(private viajesService: ViajesService,private router: Router) {
    let retrievedObject = localStorage.getItem('balanza');
    if(!retrievedObject){
      router.navigate(['/balanza']);
    }
    
     
    retrievedObject = localStorage.getItem('nave');
    if(!retrievedObject){
      router.navigate(['/naves']);
    }
    this.nave=JSON.parse(retrievedObject);

    this.viajesService.getAll(this.nave.codigo).pipe(first()).subscribe(viajes => {

      this.dataSource = new MatTableDataSource(viajes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }

  verOrden(row:Viajes){
    localStorage.setItem('viaje', JSON.stringify(row));
    this.router.navigate(['/notasventa']);
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




