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
  displayedColumns: string[] = ['codigo', 'descripcion', 'kg', 'medida', 'tipo', 'acciones'];
  esPadre = false;
  productosSeleccionados: Zkit[] = [];
  productosConCantidad: ProductoConCantidad[] = [];

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

  toggleProductoSeleccionado(producto: Zkit, event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      const existe = this.productosSeleccionados.find(p => p.codigo === producto.codigo);
      if (!existe) {
        this.productosSeleccionados.push(producto);
        this.productosConCantidad.push({
          producto: producto,
          cantidad: 0
        });
      }
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(p => p.codigo !== producto.codigo);
      this.productosConCantidad = this.productosConCantidad.filter(pc => pc.producto.codigo !== producto.codigo);
    }
  }

  isProductoSeleccionado(producto: Zkit): boolean {
    return this.productosSeleccionados.some(p => p.codigo === producto.codigo);
  }

  getCantidadProducto(producto: Zkit): number {
    const item = this.productosConCantidad.find(pc => pc.producto.codigo === producto.codigo);
    return item ? item.cantidad : 1;
  }

  actualizarCantidad(producto: Zkit, nuevaCantidad: number) {
    const item = this.productosConCantidad.find(pc => pc.producto.codigo === producto.codigo);
    if (item) {
      item.cantidad = nuevaCantidad;
    }
  }

  armarKit() {
  if (this.productosSeleccionados.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No hay productos seleccionados',
      text: 'Por favor, seleccione al menos un producto para armar el kit.'
    });
    return;
  }

  const body = this.productosConCantidad.map(pc => ({
    idProducto: pc.producto.idProducto,
    cantidad: pc.cantidad
  }));

  // Validación: cantidad no puede ser cero, vacía o NaN
  const cantidadInvalida = body.some(item =>
    item.cantidad === 0 ||
    item.cantidad === null ||
    item.cantidad === undefined ||
    isNaN(item.cantidad)
  );

  if (cantidadInvalida) {
    Swal.fire({
      icon: 'warning',
      title: 'Cantidad inválida',
      text: 'Por favor, ingrese una cantidad válida (distinta de cero) para todos los productos seleccionados.'
    });
    return;
  }

  this.zkitService.generarMovimientoZkit(body).subscribe({
    next: (res) => {
      Swal.fire({
        icon: 'success',
        title: 'Movimiento generado con éxito',
        showConfirmButton: true,
        timer: 2000
      });
      this.productosSeleccionados = [];
      this.productosConCantidad = [];
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
