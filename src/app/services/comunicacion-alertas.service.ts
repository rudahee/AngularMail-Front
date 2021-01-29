import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoGeneralComponent } from '../components/dialogo-general/dialogo-general.component';
import { DialogoTypes } from '../components/dialogo-general/dialogo-data-type';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionAlertasService {

 dialogConfig = new MatDialogConfig();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
   }

  abrirDialogCargando() {
    this.cerrarDialogo()
    this.dialogConfig.data = {
      tipoDialogo: DialogoTypes.ESPERANDO
    };
    this.dialog.open(DialogoGeneralComponent, this.dialogConfig);
  }

  abrirDialogError(textoDeError: string) {
    this.cerrarDialogo()
    this.dialogConfig.data = {
      tipoDialogo: DialogoTypes.ERROR,
      texto: textoDeError
    };
    this.dialog.open(DialogoGeneralComponent, this.dialogConfig);
  }

  abrirDialogInfo(textoDeInfo: string): Observable<number> {
    this.cerrarDialogo()
    this.dialogConfig.data = {
      tipoDialogo: DialogoTypes.INFORMACION,
      texto: textoDeInfo
    };

    const dialogRef = this.dialog.open(DialogoGeneralComponent, this.dialogConfig);

    return dialogRef.afterClosed();
  }
  abrirDialogConfirmacion(textoDeConfirmacion: string): Observable<number> {
    this.cerrarDialogo()
    this.dialogConfig.data = {
      tipoDialogo: DialogoTypes.CONFIRMACION,
      texto: textoDeConfirmacion
    };

    const dialogRef = this.dialog.open(DialogoGeneralComponent, this.dialogConfig);

    return dialogRef.afterClosed();
  }

  mostrarSnackBar(mensajeAMostrar: string) {
    this.snackBar.open(mensajeAMostrar, null, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  cerrarDialogo() {
    this.dialog.closeAll();
  }
}
