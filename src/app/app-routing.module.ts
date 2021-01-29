import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUsuarioComponent } from 'src/app/components/login-usuario/login-usuario.component';
import { ListadoMensajesComponent } from 'src/app/components/listado-mensajes/listado-mensajes.component';
import { CambioPasswordComponent } from './components/cambio-password/cambio-password.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginUsuarioComponent},
  {path: 'listadoMensajes', component: ListadoMensajesComponent},
  {path: 'password', component: CambioPasswordComponent},
  {path: 'datosUsuario', component: DatosUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
