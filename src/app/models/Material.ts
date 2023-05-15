import { ExistenciaSap } from "./ExistenciaSap";

export class Material{
    codigo :string;
    org_vtas :string;
    canal :string;
    descripcion :string;
    iva   :number
    grupo :string;
    rubro :string;
    marca :string;
    uventa :number
    medida1 :string;
    medida2 :string;
    factor :number
    codigobase :string;
    peso :number
    abccode :string;
    tamanio :string;
    uventasDisponibles:string[]=[];
    existencias:ExistenciaSap[]=[];
}