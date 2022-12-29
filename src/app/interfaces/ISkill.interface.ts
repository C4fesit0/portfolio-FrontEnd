export interface Rol {
  id: number;
  nombre: string;
}

export interface ISkill {
  id: number;
  nombre: string;
  logo: string;
  rol: Rol;
}
