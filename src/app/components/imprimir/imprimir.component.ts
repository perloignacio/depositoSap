import { Component, OnInit } from '@angular/core';
import { NotaVentaDetalle } from '@app/models/notavta-detalle';
import { SharedService } from '@app/services/shared.service';

@Component({

  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {
  notas:NotaVentaDetalle[]=[];
  constructor(private svcShared:SharedService) {
    this.notas=svcShared.NotaVentaDetalle;

  }

  ngOnInit(): void {
   setTimeout(()=>{
      window.print();
    }, 3000);

  }

}
