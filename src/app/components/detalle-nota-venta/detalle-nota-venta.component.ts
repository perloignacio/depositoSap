import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { balanza } from '@app/models/balanza';
import { Etiqueta } from '@app/models/etiqueta';
import { Naves } from '@app/models/naves';
import { notavta } from '@app/models/notavta';
import { NotaVentaDetalle } from '@app/models/notavta-detalle';
import { Preparacion } from '@app/models/preparacion';
import { Productos } from '@app/models/productos';
import { TiposFaltante } from '@app/models/tiposfaltantes';
import { Viajes } from '@app/models/viajes';
import { AuthenticationService } from '@app/services/authentication.service';
import { BalanzaService } from '@app/services/balanza.service';
import { ImprimirService } from '@app/services/imprimir.service';
import { NotasvtasService } from '@app/services/notasvtas.service';
import { SharedService } from '@app/services/shared.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-nota-venta',
  templateUrl: './detalle-nota-venta.component.html',
  styleUrls: ['./detalle-nota-venta.component.css']
})
export class DetalleNotaVentaComponent implements OnInit {
  nave:Naves;
  bs:BalanzaService;
  objViajes:Viajes;
  balanza:balanza;
  nota:notavta=new notavta();
  id:number;
  empresa:string;
  cantidad:number=0;
  cargandoPagina:boolean=true;
  faltantes:TiposFaltante[]=[];
  notas:NotaVentaDetalle[]=[];
  clase:string="";
  peso:number=0;
  esadmin:boolean=false;
  dataSource: MatTableDataSource<NotaVentaDetalle>;
  displayedColumns: string[] = ['Imprimir','Codigo', 'Descripcion', 'Umedida', 'Pendiente','Cantidad','CantidadCtrl','Faltante','Existencia','Acciones'];
  constructor(private svcNotas:NotasvtasService,private route: ActivatedRoute,svcBalanza:BalanzaService,private svcShared:SharedService,private router:Router,public svcImpimir:ImprimirService,private svcAutenticate:AuthenticationService) {

    this.route.queryParams.subscribe(params => {
      this.svcNotas.faltantes().pipe(first()).subscribe(lista=>{
        this.faltantes=lista;
      });

      this.id= params['id']
      this.empresa= params['empresa']
      var retrievedObject = localStorage.getItem('nave');
      this.nave=JSON.parse(retrievedObject);
      retrievedObject = localStorage.getItem('viaje');
      this.objViajes=JSON.parse(retrievedObject);
      retrievedObject = localStorage.getItem('balanza');
      this.balanza=JSON.parse(retrievedObject);

      this.bs=svcBalanza;
      
      if(this.svcAutenticate.currentUserValue.RolDeposito=="depositoadmin"){
        this.esadmin=true;
      }
      this.inicio();


    });

  }

  inicio(){
    this.svcNotas.getOne(this.id).subscribe(nota => {
      this.nota=nota;
      this.svcNotas.detalle(this.id,this.nave.codigo,this.objViajes.numero).pipe(first()).subscribe(notavtaDetalle => {
        this.notas=notavtaDetalle;
        this.dataSource = new MatTableDataSource(notavtaDetalle);
        this.cargandoPagina=false;
      });
  });}
  

  

  tomarpesada(row:NotaVentaDetalle){
    this.bs.lectura(this.balanza.Id).pipe(first()).subscribe(lectura => {
    if(lectura){
      if(lectura.Status=="E"){
        row.cantprep=lectura.Valor;
        this.peso=lectura.Valor;
        this.clase="text-success";
       }else{
        this.peso=lectura.Valor;
        row.cantprep=0;
        this.clase="text-danger";
        this.tomarpesada(row);
       }
    }else{
      alert("Ocurrio un error al tomar lectura");
    }




    });
  }
  guardar(){
    
    let errors:boolean;
    let msj:string="";
    let existencia=false;
    let ok=true;
    let EnviaMails=false;
    errors=false;
    let preparaciones:Preparacion[]=[];
    this.notas.forEach(nvd => {

      if(nvd.cantprep>nvd.getEquivalenciaUnSel()){
        if(nvd.cantprepum.toLowerCase().includes("un")){
          msj="No puede cargar mas items que los pedidos";
          errors=true;
        }
      }
      if (nvd.cantprep!=0){
        if(nvd.getEquivalenciaUnSel()>nvd.cantprep){
          if(nvd.motivo.toString().trim()=='0'){
            msj="Indique el motivo del faltante";
            errors=true;
          }
        }
      }

      if (nvd.cantprep!=0){
        if(!nvd.cantControl){
          msj="La cantidad control no puede ir vacia";
          errors=true;
        }else{
          if (nvd.cantControl==0){
            msj="La cantidad control no puede ir vacia";
            errors=true;
          }
        }
      }

      // chequear si esta preparando y existencia es igual o menor 0
      if(!errors){

       

        if(nvd.cantprep>0 && nvd.existencia<=0){
          msj="En el sistema parece que no hay existencia del producto. Esta seguro que es el producto correcto? en caso afirmativo por favor notifique a su superior del error en el control de existencias.";
          EnviaMails=true;
          existencia=true;
          ok=false;
        }
        if(nvd.cantprep>nvd.existencia){
          msj="Esta preparando mas mercaderia que la indicada en existencia. Esta seguro que es el producto correcto? en caso afirmativo por favor notifique a su superior del error en el control de existencias.";
          EnviaMails=true;
          existencia=true;
          ok=false;
        }
        if(nvd.material.toString().trim()!='0' && nvd.existencia>0){
          msj="En el sistema parece que hay existencia del producto que ud marco como faltante, desea continuar?";
          existencia=true;
          ok=false;
        }
      }
      
      const prepa=new Preparacion();
      prepa.cantprep=nvd.cantprep;
      prepa.cantprepum=nvd.cantprepum;
      prepa.material=nvd.material;
      prepa.motivo=nvd.motivo;
      prepa.numeroNota=nvd.numero;
      if(nvd.cantprepum.toLowerCase()=="un"){
        prepa.peso_real=nvd.cantControl;
      }else{
        prepa.peso_real=nvd.cantprep;
      }
      prepa.pos=nvd.pos;
      prepa.viaje=nvd.viaje;
      prepa.descripcion=this.objViajes.descripcion;
      preparaciones.push(prepa)
      
    });

    if (errors){
      alert(msj);
    }else{
      if(existencia)
      {

        Swal.fire({
          title: "Atencion",
          text:msj,
          icon:'warning',
          showDenyButton: true,
          confirmButtonText: 'Aceptar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          
          if (result.isConfirmed) {
            this.svcNotas.guardar(preparaciones).pipe(first()).subscribe(lbl => {
              if(lbl=='Error'){
                alert("Error al guardar preparación");
              }else{
                alert("Se guardo correctamente");
                this.inicio()
              }
            });

          }
        })
      }

      if(ok){
        if(preparaciones.length>0){

          this.svcNotas.guardar(preparaciones).pipe(first()).subscribe(lbl => {
            if(lbl=='Error'){
              alert("Error al guardar preparación");
            }else{
              alert("Se guardo correctamente");
              this.inicio()
            }
          });
          //console.log(_prod);
        }else{
          alert("Debe editar al menos 1 registro");
        }
      }



    }
    
  }
  imprimir(){
    
   
    let eti:Etiqueta=new Etiqueta();
    eti.nave=this.nave;
    eti.nota=this.nota;
    eti.viaje=this.objViajes;
    eti.productos=[];
    this.notas.forEach(element => {
      if (element.imprimir){
        eti.productos.push(element);
      }
    });
    //console.log(eti);
    this.svcImpimir.imprimir(eti).pipe(first()).subscribe(lbl => {
      if(lbl=='Error'){
        alert("Error al imprimir etiqueta");
      }else{
        alert("Imprimiendo");
      }
    },(err)=>{
      console.log(err);
    });
    
    


  }
  

  limpiar(nvd:NotaVentaDetalle){
    
    if(confirm("Esta seguro que desea anular este registro")){
      const prepa=new Preparacion();
      prepa.material=nvd.material;
      prepa.numeroNota=nvd.numero;
      prepa.pos=nvd.pos;
      prepa.viaje=nvd.viaje;
      
      this.svcNotas.limpiar(prepa).pipe(first()).subscribe(lbl => {
        if(lbl=='Error'){
          alert("Error al anular el item");
        }else{
          alert("item anulado");
          this.inicio();
        }
      });
    }
    
  }
  ngOnInit(): void {
  }

}
