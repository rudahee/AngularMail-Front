import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { Router } from '@angular/router';
import { ComunicacionAlertasService } from 'src/app/services/comunicacion-alertas.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;
  ocultarPassword: boolean = true;

  constructor(private usuarioService: UsuarioService, private router: Router,
    private autenticadorJwtService: AutenticadorJwtService, private alertas: ComunicacionAlertasService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup( {
      usuario: new FormControl('',[Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required])
    })
  }

  autenticaUsuario() {

    this.alertas.abrirDialogCargando();

    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value,
      this.loginForm.controls.password.value).subscribe(data => {
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt);
          this.router.navigate(['/listadoMensajes']);
          this.alertas.cerrarDialogo()
        } else {
          this.alertas.abrirDialogError("Datos incorrectos")
        }
        console.log(data.jwt)
      });
  }

}
