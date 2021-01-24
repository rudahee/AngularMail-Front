import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt } from 'src/app/interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  autenticaUsuario(usuario: string, password: string): Observable<DatosConJwt> {
    const md5 = new Md5();
    var jsonObject = {
      usuario: usuario,
      password: md5.appendStr(password).end().toString()
    };


    return this.http.post<DatosConJwt>('/usuario/autentica', jsonObject).pipe(
      tap(
        data => {
          console.log('Desde tap miro los datos recibidos: ' + data["jwt"]);
        }
      )
    )
  }
}
