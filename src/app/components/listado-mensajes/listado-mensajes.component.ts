import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/interfaces';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.component.html',
  styleUrls: ['./listado-mensajes.component.scss']
})
export class ListadoMensajesComponent implements OnInit {

  listaMensajes: Mensaje[];

  constructor(private mensajeService: MensajeService) { }

  ngOnInit(): void {
    this.mensajeService.getListadoMensajes(0, 10).subscribe(data => {
      this.listaMensajes = data;
      this.listaMensajes.forEach(mensaje => {
        console.log(mensaje)
      })
    })
  }

}
