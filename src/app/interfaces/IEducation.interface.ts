export interface IEducation {
  id: number;
  titulo: string;
  fecha_inicio: string;
  fecha_final: string;
  actualidad: boolean;
  institucion: string;
  imagen: string;
  nivel :Nivel;
}

interface Nivel{
  id:number;
  nombre:string;
}
