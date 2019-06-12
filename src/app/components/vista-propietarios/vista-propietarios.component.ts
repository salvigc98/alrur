import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { EliminarAlojamientoComponent } from '../shared/eliminar-alojamiento/eliminar-alojamiento.component';

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
  token: any;

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    public lisarAlojamiento: ListarAlojamientosService,
    public eliminaralojamiento: EliminarAlojamientoService,
    ) { }

    listarCasasRurales(token){
      this.lisarAlojamiento.listarAlojamientoPropietario(token)
      .subscribe(data =>{
        this.alojamientos = data;
        console.log(this.alojamientos);
      },
      error =>{
        console.log(error);
      });
    }

  ngOnInit() {
    this.token = this.cookieService.get('token');
    this.listarCasasRurales(this.token);
  }

//   openDialogViajero() {

   
// }

  anadirCasa() {
    this.router.navigate(['/', 'anadirAlojamiento']);
  }

  eliminarAlojamiento(id_casarural){

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '200px';
    dialogConfig.height = '200px';

    dialogConfig.data = {
  };


    const dialogRef = this.dialog.open(EliminarAlojamientoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
    data => {
    //  console.log(data);
    if (data == 'si'){
      this.eliminaralojamiento.eliminarAlojamiento(id_casarural)
      .subscribe((data:any) =>{
        if(data == 'exito'){
          console.log(data)
          this.listarCasasRurales(this.token);
        }
      },
      error =>{
        console.log(error);
      });
    }
    }
);
}
}
