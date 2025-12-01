import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Zkit } from '@app/models/zkit';
import { ZkitService } from '@app/services/zkit.service';
import Swal from 'sweetalert2';

interface ProductoConCantidad {
  producto: Zkit;
  cantidad: number;
}

@Component({
  selector: 'app-zkit-armado',
  templateUrl: './zkit-armado.component.html',
  styleUrls: ['./zkit-armado.component.css']
})
export class ZkitArmadoComponent implements AfterViewInit {
  productosFamilia: Zkit[] = [];
  dataSource = new MatTableDataSource<Zkit>([]);
  displayedColumns: string[] = [];
  esPadre = false;

  altas: { [codigo: string]: number } = {};
  bajas: { [codigo: string]: number } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private zkitService: ZkitService) {
    const familiaId = this.route.snapshot.paramMap.get('id');
    if (familiaId) {
      this.zkitService.getProductosByFamilias(familiaId).subscribe({
        next: (productos: Zkit[]) => {
          this.productosFamilia = productos;
          this.dataSource.data = productos;
          if (productos.length > 0 && productos[0].soloPadre === 'SI') {
            this.esPadre = true;
            this.displayedColumns = ['codigo', 'descripcion', 'medida', 'altas'];
          } else {
            this.displayedColumns = ['codigo', 'descripcion', 'medida', 'altas', 'bajas'];
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCantidadAlta(row: Zkit): number {
    return this.altas[row.codigo] || 0;
  }

  getCantidadBaja(row: Zkit): number {
    const valor = this.bajas[row.codigo] || 0;
    return Math.abs(valor);
  }

  actualizarCantidadAlta(row: Zkit, cantidad: number) {
    this.altas[row.codigo] = cantidad;
  }

  actualizarCantidadBaja(row: Zkit, cantidad: number) {
    this.bajas[row.codigo] = cantidad > 0 ? -cantidad : cantidad;
  }

  getSubtotalAltas(): number {
    let suma = 0;
    for (const codigo in this.altas) {
      const producto = this.productosFamilia.find(p => p.codigo === codigo);
      if (producto && this.altas[codigo] > 0) {
        suma += this.altas[codigo] * producto.kg;
      }
    }
    return suma;
  }

  getSubtotalBajas(): number {
    let suma = 0;
    for (const codigo in this.bajas) {
      const producto = this.productosFamilia.find(p => p.codigo === codigo);
      if (producto && this.bajas[codigo] < 0) {
        suma += this.bajas[codigo] * producto.kg;
      }
    }
    return suma;
  }

  getCantidadProductosSeleccionados(): number {
    const altasCount = Object.values(this.altas).filter(v => v > 0).length;
    const bajasCount = Object.values(this.bajas).filter(v => v < 0).length;
    return altasCount + bajasCount;
  }

  armarKit() {
    const body: any[] = [];

    for (const codigo in this.altas) {
      if (this.altas[codigo] > 0) {
        const producto = this.productosFamilia.find(p => p.codigo === codigo);
        if (producto) {
          body.push({
            idProducto: producto.idProducto,
            cantidad: this.altas[codigo]
          });
        }
      }
    }

    for (const codigo in this.bajas) {
      if (this.bajas[codigo] < 0) {
        const producto = this.productosFamilia.find(p => p.codigo === codigo);
        if (producto) {
          body.push({
            idProducto: producto.idProducto,
            cantidad: this.bajas[codigo]
          });
        }
      }
    }

    this.zkitService.generarMovimientoZkit(body).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Movimiento generado con éxito',
          showConfirmButton: true,
          timer: 2000
        });
        this.altas = {};
        this.bajas = {};
        this.dataSource.data = this.productosFamilia;
      },
      error: (err) => {
        console.error(err);
        const msg =
          err?.error?.Message ||
          err?.error?.message ||
          err?.Message ||
          err?.message ||
          JSON.stringify(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al generar el movimiento',
          text: msg
        });
      }
    });
  }
}