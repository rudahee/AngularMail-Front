export interface DatosConJwt {
  jwt: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  usuario: string;
  password: string;
  email: string;
  fechaNacimiento: string;
  fechaEliminacion: string;
  nacionalidad: string;
  sexo: number;
  imagen: string;
}

export interface ListadoMensajes {
  mensajes: Mensaje[];
  totalMensajes: number;
}
export interface Mensaje {
  id: number;
  remitente: UsuarioMinimo,
  destinatarios: UsuarioMinimo[],
  fecha: Date;
  asunto: string;
  cuerpo: string;
  leido: boolean;
  archivado: boolean;
  fechaEliminacion: Date;
  spam: boolean;
}

export interface UsuarioMinimo {
  id: number;
  nombre: string;
}

export interface Nacionalidad {
  id: number;
  descripcion: string;
}

export interface TipoSexo {
  id: number;
  descripcion: string;
}
