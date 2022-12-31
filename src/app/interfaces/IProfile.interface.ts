
export interface IProfile {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  sobre_mi: string;
  titulo: string;
  foto_perfil: string;
  tecnologias: Tecnologia[];
}

interface Tecnologia {
  id: number;
  nombre: string;
  logo: string;
  rol: Rol;
}
interface Rol {
  id: number;
  nombre: string;
}


