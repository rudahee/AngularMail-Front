import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ListadoMensajes, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class MensajeService {

  public static readonly RECIBIDOS = 0;
  public static readonly ENVIADOS = 1;
  public static readonly SPAM = 2;
  public static readonly ARCHIVADOS = 3;


  constructor(private http: HttpClient) { }

  getListadoMensajes(tipo: number, pagina: number, lineasPorPagina: number): Observable<ListadoMensajes> {
    return this.http.get<ListadoMensajes>('/mensajes/listadoPorTipo?tipo=' + tipo + '&pagina=' + pagina +
      '&mensajesPorPagina=' + lineasPorPagina)
  }

  accionSobreMensajes (ids: number[], tipoAccion: number) {
    var dto = {
      'ids': ids,
      'tipoAccion': tipoAccion
    };
    return this.http.post<string>('/mensajes/accionSobreMensajes', dto);
  }


  enviarNuevoMensaje (destinatarios: Usuario[], asunto: string, cuerpo: string) {
    var idsDestinatarios: number[] = [];
    destinatarios.forEach(usuario => idsDestinatarios.push(usuario.id));
    var dto = {
      'idsDestinatarios': idsDestinatarios,
      'asunto': asunto,
      'cuerpo': cuerpo
    };
    return this.http.put<string>('/mensajes/nuevo', dto);
  }
}
