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
  fechaentrada: any = '';
  fechasalida: any = '';
  fechaentradavalue: any = '';
  fechasalidavalue: any = '';
  comentario: string;
  dni: string;
  telefono: number;
  direccion: string;
  localidad: string;
  cp: number;
  plazas: number;
  token: string;
  submitted: boolean = false;
  comparaFechas: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public listaralojamiento: ListarAlojamientosService,
    public consultardisponibilidad: ConsultarDisponibilidadService,
    public comprobarviajero: ComprobarViajeroService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.token = this.cookieService.get('token');
    console.log(this.token);
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
        fechaentrada: [{value: this.fechaentrada, disabled: true}, [Validators.required]],
        fechasalida: [{value: this.fechasalida, disabled: true}, [Validators.required]],
        dni: [this.dni, [Validators.required]],
        telefono: [this.telefono, [Validators.required]],
        direccion: [this.direccion, [Validators.required]],
        localidad: [this.localidad, [Validators.required]],
        cp: [this.cp, [Validators.required]],
        plazas: [this.plazas, [Validators.required]],
        comentario: [this.comentario],
      });
  }


  get f() {
    return this.formdisp.controls;
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

    dialogRef.afterClosed().subscribe(
    data => {
      if (data != undefined){
    this.token = data;
      }
    }
);
}

  consultarDisp() {
    // console.log(this.formdisp.value);
    // let token = this.cookieService.get('token');

    // console.log(this.fechaentradavalue);

    this.submitted = true;

    this.fechaentradavalue = this.formdisp.getRawValue().fechaentrada;
    this.fechasalidavalue = this.formdisp.getRawValue().fechasalida;

    if (this.formdisp.invalid || this.formdisp.getRawValue().fechaentrada == '' || this.formdisp.getRawValue().fechasalida == '') {
      console.log('return');
      return;
  }

    if (this.fechaentradavalue >= this.fechasalidavalue) {
      this.comparaFechas = true;
      return;
  }else{
    this.comparaFechas = false;
  }
    let comentario = this.formdisp.value.comentario;
    let dni = this.formdisp.value.dni;
    let telefono = this.formdisp.value.telefono;
    let direccion = this.formdisp.value.direccion;
    let localidad = this.formdisp.value.localidad;
    let cp = this.formdisp.value.cp;
    let plazas = this.formdisp.value.plazas;
    this.fechaentradavalue = formatDate(this.fechaentradavalue, 'yyyy-MM-dd', 'en-US');
    this.fechasalidavalue = formatDate(this.fechasalidavalue, 'yyyy-MM-dd', 'en-US');

    this.comprobarviajero.comprovarViajeroConectado(this.token)
    .subscribe(
      (data: any) =>{
        console.log(data);
        if(data == 0){
        this.openDialogViajero();
        }
        if(data == 1){

// tslint:disable-next-line: max-line-length
          this.consultardisponibilidad.consultarDisponibilidad(this.id_casarural, dni, telefono, direccion, localidad, cp, plazas, this.fechaentradavalue, this.fechasalidavalue, comentario, this.token)
          .subscribe(
            (data: string) => {
              if(data == 'correo_enviado'){
                this.snackBar.open('Se ha enviado un correo con los datos del alquiler al propietario de la casa', '', {
                  duration: 3000,
                });
              }
              if(data == 'error'){
                this.snackBar.open('Hubo un error mientras se enviaban lo datos', '', {
                  duration: 3000,
                });
              }
            },
            error =>{
              this.snackBar.open('Fallo al conectar con el servidor', '', {
                duration: 3000,
              });
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
