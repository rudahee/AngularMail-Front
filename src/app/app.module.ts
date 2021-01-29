import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { ListadoMensajesComponent } from './components/listado-mensajes/listado-mensajes.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MatTableModule } from '@angular/material/table';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { NuevoMensajeComponent } from './components/nuevo-mensaje/nuevo-mensaje.component';
import { DetalleMensajeComponent } from './components/detalle-mensaje/detalle-mensaje.component';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogoGeneralComponent } from './components/dialogo-general/dialogo-general.component';
import { BarraHerramientasComponent } from './components/barra-herramientas/barra-herramientas.component';
import { ImagenUsuarioComponent } from './components/imagen-usuario/imagen-usuario.component';
import { CambioPasswordComponent } from './components/cambio-password/cambio-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    ListadoMensajesComponent,
    DialogoGeneralComponent,
    BarraHerramientasComponent,
    ImagenUsuarioComponent,
    CambioPasswordComponent,
    DatosUsuarioComponent,
    NuevoMensajeComponent,
    DetalleMensajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
