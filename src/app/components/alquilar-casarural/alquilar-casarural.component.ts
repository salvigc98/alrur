import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LoginComponent } from '../navbar/login/login.component';

// Servicios

import { ListarAlojamientosService } from '../../servicios/listar-alojamientos.service';
import { ConsultarDisponibilidadService } from '../../servicios/consultar-disponibilidad.service';
import { ComprobarViajeroService } from '../../servicios/comprobar-viajero.service';

@Component({
  selector: 'app-alquilar-casarural',
  templateUrl: './alquilar-casarural.component.html',
  styleUrls: ['./alquilar-casarural.component.css']
})
export class AlquilarCasaruralComponent implements OnInit {

  id_casarural: any;
  alojamiento = [];
  imagenes: any;
  formdisp: FormGroup;
  fechaentrada: any;
  fechasalida: any;
  comentario: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public listaralojamiento: ListarAlojamientosService,
    public consultardisponibilidad: ConsultarDisponibilidadService,
    public comprobarviajero: ComprobarViajeroService,
    private fb: FormBuilder,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.id_casarural = data.id_casarural;
      }
    )
    this.listaralojamiento.listarAlojamiento(this.id_casarural)
    .subscribe(
      data =>{
        this.alojamiento = data[0];
        console.log(this.alojamiento);
      },
      error =>{
        console.log(error);
      });

    this.listaralojamiento.listarAlojamientoImagenes(this.id_casarural)
    .subscribe(
      data =>{
        this.imagenes = data;
        console.log(this.imagenes);
      },
      error =>{
        console.log(error);
      });

    this.formdisp = this.fb.group({
        fechaentrada: [this.fechaentrada, [Validators.required]],
        fechasalida: [this.fechasalida, [Validators.required]],
        comentario: [this.comentario]
      });
  }

  openDialogViajero() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '350px';
    dialogConfig.height = '500px';

    dialogConfig.data = {
  };


  const dialogRef = this.dialog.open(LoginComponent, dialogConfig);


}

  consultarDisp() {
    // console.log(this.formdisp.value);
    let token = this.cookieService.get('token');
    let fechaEntrada = this.formdisp.value.fechaentrada;
    let fechaSalida = this.formdisp.value.fechasalida;
    let comentario = this.formdisp.value.comentario;
    fechaEntrada = formatDate(fechaEntrada, 'yyyy-MM-dd', 'en-US');
    fechaSalida = formatDate(fechaSalida, 'yyyy-MM-dd', 'en-US');

    this.comprobarviajero.comprovarViajeroConectado(token)
    .subscribe(
      (data: any) =>{
        // console.log(data);
        if(data == 0){
        this.openDialogViajero();
        }
        if(data == 1){
          this.consultardisponibilidad.consultarDisponibilidad(this.id_casarural, fechaEntrada, fechaSalida, comentario)
          .subscribe(
            data => {
              console.log(data);
            },
            error =>{
              console.log(error);
            }
          )
          // console.log(fechaEntrada);
        }
        if(data == 'error'){
          console.log('error');
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
}
