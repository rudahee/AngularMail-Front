import { Component, OnInit } from '@angular/core';
import { ComunicacionAlertasService } from 'src/app/services/comunicacion-alertas.service'
import { DialogoTypes } from 'src/app/components/dialogo-general/dialogo-data-type';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {

  usuarioAutenticado: Usuario; // Guardo el usuario autenticado

  // Necesito varios objetos inyectados en este componente
  constructor(private comunicacionAlertasService: ComunicacionAlertasService,
    private autenticacionPorJWT: AutenticadorJwtService,
    private router: Router,
    private usuariosService: UsuarioService) { }


  ngOnInit () {
    this.usuariosService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuarioAutenticado => {
      this.usuarioAutenticado = nuevoUsuarioAutenticado;
    });
  }

  /**
   * El logo de la barra de herramientas nos llevará al listado de mensajes
   */
  navegarHaciaPrincipal() {
    this.router.navigate(['/listadoMensajes']);
  }

  /**
   * Confirmación de que deseamos abandonar la sesión
   */
  confirmacionAbandonarSesion() {
    this.comunicacionAlertasService.abrirDialogConfirmacion ('¿Realmente desea abandonar la sesión?').subscribe(opcionElegida => {
      if (opcionElegida == DialogoTypes.RESPUESTA_ACEPTAR) {
        this.autenticacionPorJWT.eliminarJWT();
        this.usuarioAutenticado = null;
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Navegar hacia el componente de cambiar password
   */
  navegarHaciaCambiaPassword () {
    this.router.navigate(['/password']);
  }


  /**
   * Navegar hacia el componente de modificación de los datos del usuario
   */
  navegarHaciaDatosPersonales () {
    this.router.navigate(['/datosUsuario']);
  }

}
