import { ListadoMensajes, Mensaje, Usuario } from '../../interfaces/interfaces';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MensajeService } from '../../services/mensaje.service';
import { ComunicacionAlertasService } from 'src/app/services/comunicacion-alertas.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleMensajeComponent } from 'src/app/components/detalle-mensaje/detalle-mensaje.component';
import { NuevoMensajeComponent } from 'src/app/components/nuevo-mensaje/nuevo-mensaje.component';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.component.html',
  styleUrls: ['./listado-mensajes.component.scss']
})
export class ListadoMensajesComponent implements OnInit {

  usuarioAutenticado: Usuario;
  nombresDeColumnas: string[] = ['Select', 'De', 'Asunto', 'Fecha'];
  listadoMensajes: ListadoMensajes = {
    mensajes: [],
    totalMensajes: 0
  };
  tipoListadoMensajes: number = 0;

  dataSourceTabla = new MatTableDataSource<Mensaje>(this.listadoMensajes.mensajes);

  selection = new SelectionModel<Mensaje>(true, []);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  constructor(private mensajesService: MensajeService,
    private comunicacionAlertas: ComunicacionAlertasService,
    private usuarioService: UsuarioService,
    private router: Router,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario => {
      if (usuario == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.usuarioAutenticado = usuario;
      }
    });
  }

  ngAfterViewInit() {
    this.configuraEtiquetasDelPaginador();
    this.actualizaListadoMensajes();
  }

  private configuraEtiquetasDelPaginador() {
    this.paginator._intl.itemsPerPageLabel = "Mensajes por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primera";
    this.paginator._intl.lastPageLabel = "Última";
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

  actualizaListadoMensajes() {
    this.comunicacionAlertas.abrirDialogCargando();
    this.mensajesService.getListadoMensajes(this.tipoListadoMensajes, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      if (data["result"] == "fail") {
        this.comunicacionAlertas.abrirDialogError('Imposible obtener los mensajes desde el servidor');
      }
      else {
        this.listadoMensajes = data;
        this.dataSourceTabla = new MatTableDataSource<Mensaje>(this.listadoMensajes.mensajes);
        this.comunicacionAlertas.cerrarDialogo();
      }
    });
  }
  seleccionarMensaje(mensaje: Mensaje) {
    const dialogRef = this.dialog.open(DetalleMensajeComponent, {
      width: '100%',
      height: '90%',
      data: mensaje,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.actualizaListadoMensajes();
    });
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceTabla.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceTabla.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Mensaje): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  cambioEnTiposDeMensajesVisualizados(indiceTiposDeMensajeSeleccionado) {
    this.paginator.firstPage();

    this.tipoListadoMensajes = indiceTiposDeMensajeSeleccionado
    this.actualizaListadoMensajes();
  }

  getIdsMensajesSeleccionados (): number[] {
    var idsMensajesSeleccionados = [];
    this.selection.selected.forEach((item, index) => {
      idsMensajesSeleccionados.push(item.id);
    });
    return idsMensajesSeleccionados;
  }

  accionSobreMensajes(tipoAccion: number) {
    this.mensajesService.accionSobreMensajes(this.getIdsMensajesSeleccionados(), tipoAccion).subscribe(strResult => {
      if (strResult['result'] == 'fail') {
        this.comunicacionAlertas.abrirDialogError('Error al realizar la operación. Inténtelo más tarde.')
      }
      else {
        this.actualizaListadoMensajes();
      }
    });
  }

  getTextoColumnaRemitente (mensaje: Mensaje) {
    if (this.usuarioAutenticado.id != mensaje.remitente.id) {
      return 'De: ' + mensaje.remitente.nombre
    }
    else {
      var str: string = 'Para: ';
      mensaje.destinatarios.forEach(function(destinatario, i, destinatarios) {
        str += destinatario.nombre;
        if (i < (destinatarios.length-1)) {
          str += ', ';
        }
      })
      return str;
    }
  }

    hayAlgunElementoSeleccionadoEnTabla(): boolean {
      return this.selection.selected.length > 0;
    }

    botonArchivarHabilitado(): boolean {
      return this.tipoListadoMensajes == MensajeService.RECIBIDOS && this.hayAlgunElementoSeleccionadoEnTabla();
    }

    botonSpamHabilitado(): boolean {
      return this.tipoListadoMensajes == MensajeService.RECIBIDOS && this.hayAlgunElementoSeleccionadoEnTabla();
    }

    botonEliminarHabilitado(): boolean {
      return this.tipoListadoMensajes != MensajeService.ENVIADOS && this.hayAlgunElementoSeleccionadoEnTabla();
    }

    botonMoverARecibidosHabilitado(): boolean {
      return (this.tipoListadoMensajes == MensajeService.SPAM || this.tipoListadoMensajes == MensajeService.ARCHIVADOS)
        && this.hayAlgunElementoSeleccionadoEnTabla();
    }

    nuevoMensaje() {
      const dialogRef = this.dialog.open(NuevoMensajeComponent, {
        width: '100%',
        height: '90%'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.actualizaListadoMensajes();
      });
      }
}
