import { Injectable } from '@angular/core';
import { Nacionalidad } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  constructor(private http: HttpClient) { }

  getListadoNacionalidades(): Observable<Nacionalidad[]> {
    return this.http.get<Nacionalidad[]>('/nacionalidad/all');
  }
}
