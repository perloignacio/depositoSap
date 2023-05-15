import { AuthenticationService } from "@app/services/authentication.service";
import { Material } from "./Material";
import { TiposFaltante } from "./tiposfaltantes";

export class NotaVentaDetalle
{
  viaje :string;
  numero :string;
  pos :number
  reparto :number
  motivo :string;
  fecha_pedido:Date;
  material :string;
  descrip_material :string;
  peso_real :number;
  cantconf :number;
  cantconfum :string;
  cantprep :number;
  cantprepum :string;
  cantped :number;
  umped :string;
  peso_bruto :number;
  nave :string;
  centro :string;
  bultos :string;
  obs :string;
  materialObj:Material
  TIposfal:TiposFaltante;
  cantControl:number;
  uventacantControl:string;
  equivalencias:any[]=[];
  existencia:number=0;
  disabled:boolean=false;
  imprimir:boolean=false;
  constructor(obj?: any) {

    Object.assign(this, obj);
    //console.log(obj);
    if(!this.cantprepum){
      this.cantprepum=this.cantconfum;
    }
    
    this.materialObj.existencias.forEach((e)=>{
      console.log(e);
      this.existencia+=e.existencia;
    })
    this.setEquivalencias(true);
    if(this.cantprep || this.motivo!=""){
      this.disabled=true;
      this.setCantCtrol();
    }
    

  }

  setEquivalencias(primeraVez:boolean=false){
    if(!primeraVez){
      this.cantprep=0;
      this.cantControl=0;
    }
    
    this.equivalencias=[];
    this.equivalencias.push({cant:this.cantconf,um:this.cantconfum});
    if(this.materialObj.medida2){
      if(this.cantconfum==this.materialObj.medida1){
        this.uventacantControl=this.materialObj.medida2;
        this.equivalencias.push({cant:this.cantconf,um:this.materialObj.medida2});
      }else{
        this.uventacantControl=this.materialObj.medida1;
        this.equivalencias.push({cant:this.cantconf*this.materialObj.factor,um:this.materialObj.medida1});
        
      }
    }
  }

  getEquivalenciaUnSel():any{
    return this.equivalencias.find(e=>e.um==this.cantprepum);
  }
  
 

  setCantCtrol(){
    if(this.cantprepum==this.materialObj.medida1){
      this.cantControl= this.cantprep/this.materialObj.factor;
    }else{
      this.cantControl= this.cantprep*this.materialObj.factor;
    }
   
   
  }

}
