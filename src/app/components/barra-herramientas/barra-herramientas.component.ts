import { Component, OnInit } from '@angular/core';
import { ComunicacionAlertasService } from 'src/app/services/comunicacion-alertas.service'
import { DialogoTypes } from 'src/app/components/dialogo-general/dialogo-data-type';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {

  constructor(private alertas:ComunicacionAlertasService,
    private autenticacion: AutenticadorJwtService,
    private router: Router) { }

  ngOnInit(): void {
  }

  navegarHaciaPrincipal() {
    this.router.navigate(['/listadoMensajes']);
  }

  ConfirmarCierreSesion() {
    this.alertas.abrirDialogConfirmacion('¿Desea cerrar la sesion?').subscribe(
      opcion => {
        if (opcion == DialogoTypes.RESPUESTA_ACEPTAR) {
          this.autenticacion.eliminarJWT();
          this.router.navigate(['/login']);
        }
      }
    )
  };

  navegarHaciaDatosPersonales() {

  }

  navegarHaciaCambiarPassword() {

  }
}
