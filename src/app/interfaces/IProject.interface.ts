import { ISkill } from './ISkill.interface';
export interface IProject {
  id: number;
  nombre: string;
  descripcion: string;
  repositorio: string;
  demo: string;
  image: string;
  tecnologias: ISkill[];
}
