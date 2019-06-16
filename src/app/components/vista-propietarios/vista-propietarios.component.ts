import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EliminarAlojamientoComponent } from '../eliminar-alojamiento/eliminar-alojamiento.component';

// Servicios

import { ListarAlojamientosService } from '../../servicios/listar-alojamientos.service';
import { EliminarAlojamientoService } from '../../servicios/eliminar-alojamiento.service';


@Component({
  selector: 'app-vista-propietarios',
  templateUrl: './vista-propietarios.component.html',
  styleUrls: ['./vista-propietarios.component.css']
})
export class VistaPropietariosComponent implements OnInit {

  alojamientos: any;
  token: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    public lisarAlojamiento: ListarAlojamientosService,
    public eliminaralojamiento: EliminarAlojamientoService,
    ) { }

    listarCasasRurales(token) {
      this.lisarAlojamiento.listarAlojamientoPropietario(token)
      .subscribe(data => {
        this.alojamientos = data;
      },
      error => {
      });
    }

  ngOnInit() {
    this.token = this.cookieService.get('token');
    this.listarCasasRurales(this.token);
  }

  anadirCasa() {
    this.router.navigate(['/', 'anadirAlojamiento']);
  }

  eliminarAlojamiento(id_casarural){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.width = '480px';
    dialogConfig.height = '150px';

    dialogConfig.data = {
  };


    const dialogRef = this.dialog.open(EliminarAlojamientoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
    data => {
    if (data === 'si') {
      this.eliminaralojamiento.eliminarAlojamiento(id_casarural)
      .subscribe((data:any) => {
        if (data === 'exito') {
          this.listarCasasRurales(this.token);
        }
      },
      error => {
        console.log(error);
      });
    }
    }
);
}

cerrarSesion() {
  this.cookieService.delete('token');
  this.router.navigate(['/', 'home']);
}

}
