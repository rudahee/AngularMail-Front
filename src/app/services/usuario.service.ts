import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt } from 'src/app/interfaces/interfaces';
import { Usuario } from 'src/app/interfaces/interfaces'
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioAutenticado: Usuario;

  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();

  constructor(private http: HttpClient) { }


  autenticaUsuario(usuario: string, password: string): Observable<DatosConJwt> {
    const md5 = new Md5();
    var jsonObject = {
      usuario: usuario,
      password: md5.appendStr(password).end().toString()
    };


    return this.http.post<DatosConJwt>('/usuario/autentica', jsonObject)
  }

  emitirNuevoCambioEnUsuarioAutenticado() {
    this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado => {
      this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    })
  }

  getUsuarioAutenticado(incluirImagen: boolean = true): Observable<Usuario> {
    // Petición para obtener el usuario autenticado, funcionará porque se envía el JWT en
    // cada petición, gracias al HttpInterceptor
    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen)
    .pipe(
      tap(usuarioAutenticado => {
        // En la condición del if intento detectar varios casos que provocan un cambio en
        // el usuario autenticado
        if ( (this.usuarioAutenticado == null && usuarioAutenticado != null) || // No había usuario autenticado y ahora sí lo hay - Autenticación
          (this.usuarioAutenticado != null && usuarioAutenticado == null) ||  // Había usuario autenticado y ya no lo hay - Cierre de sesión
          (this.usuarioAutenticado != null && usuarioAutenticado == null && this.usuarioAutenticado.id != usuarioAutenticado.id) ) { // Cambio de usuario autenticado
            this.emitirNuevoCambioEnUsuarioAutenticado();
            this.usuarioAutenticado = usuarioAutenticado;
          }
      })
    );
  }

  cambiaPassword (nuevaPassword: string) : Observable<object> {
    var dto = {
      'password': nuevaPassword
    };
    return this.http.post<object>('/usuario/modificaPassword', dto);
  }

  ComprobarNuevaPassword (password: string) : Observable<object> {
    var dto = {
      'password': password
    };
    return this.http.post<object>('/usuario/ratificaPassword', dto);
  }

  actualizaDatosUsuario (usuario: Usuario) {
    return this.http.post<String>('/usuario/update', usuario)
    .pipe (
      tap(strResult => {
        this.emitirNuevoCambioEnUsuarioAutenticado();
      }));
  }
  filterUsuariosByNombreOrEmail(filtro: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('/usuario/filterByNombreOrEmail?filtro=' + filtro);
  }
  getUsuario(id: number, incluirImagen: boolean = false): Observable<Usuario> {
    var url= '/usuario/get?id=' + id + '&imagen=' + incluirImagen;
    return this.http.get<Usuario>(url);
  }
}
