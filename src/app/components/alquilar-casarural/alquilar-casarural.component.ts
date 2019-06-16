import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

// Componentes

import { LoginComponent } from '../login/login.component';

// Servicios

import { ListarAlojamientosService } from '../../servicios/listar-alojamientos.service';
import { ComprobarUsuariosService } from '../../servicios/comprobar-usuarios.service';
import { AlquilarCasaService } from '../../servicios/alquilar-casa.service';
import { PublicarComentarioService } from '../../servicios/publicar-comentario.service';

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
  formcom: FormGroup;
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
  submitted = false;
  comparaFechas = false;
  comentarios: any = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog,
    public listaralojamiento: ListarAlojamientosService,
    public alquilarcasa: AlquilarCasaService,
    public comprobarviajero: ComprobarUsuariosService,
    public comentarioService: PublicarComentarioService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.token = this.cookieService.get('token');
    this.route.params.subscribe(
      data => {
        this.id_casarural = data.id_casarural;
      }
    );
    this.listaralojamiento.listarAlojamiento(this.id_casarural)
    .subscribe(
      data =>{
        this.alojamiento = data[0];
      },
      error =>{
      });

    this.listaralojamiento.listarAlojamientoImagenes(this.id_casarural)
    .subscribe(
      data =>{
        this.imagenes = data;
      },
      error =>{
      });

    this.comentarioService.listarComentarios(this.id_casarural)
      .subscribe(
        data => {
          this.comentarios = data;
        },
        error => {
        }
      );

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

    this.formcom = this.fb.group({
        comentario: [this.comentario, [Validators.required]],
      });
  }


  get f() {
    return this.formdisp.controls;
  }

  openDialogViajero() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.width = '350px';
    dialogConfig.height = '500px';

    dialogConfig.data = {
  };


    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
    data => {
      if (data !== undefined) {
    this.token = data;
      }
    }
);
}

  consultarDisp() {

    this.fechaentradavalue = this.formdisp.getRawValue().fechaentrada;
    this.fechasalidavalue = this.formdisp.getRawValue().fechasalida;

    if (this.formdisp.invalid || this.formdisp.getRawValue().fechaentrada === '' || this.formdisp.getRawValue().fechasalida === '') {
      this.submitted = true;
      return;
  }else{
    this.submitted = false;
  }

    if (this.fechaentradavalue >= this.fechasalidavalue) {
      this.comparaFechas = true;
      return;
  } else {
    this.comparaFechas = false;
  }
    const comentario = this.formdisp.value.comentario;
    const dni = this.formdisp.value.dni;
    const telefono = this.formdisp.value.telefono;
    const direccion = this.formdisp.value.direccion;
    const localidad = this.formdisp.value.localidad;
    const cp = this.formdisp.value.cp;
    const plazas = this.formdisp.value.plazas;
    this.fechaentradavalue = formatDate(this.fechaentradavalue, 'yyyy-MM-dd', 'en-US');
    this.fechasalidavalue = formatDate(this.fechasalidavalue, 'yyyy-MM-dd', 'en-US');

    this.comprobarviajero.comprobarViajeroConectado(this.token, 'conectado')
    .subscribe(
      (data: any) => {
        if (data === 0) {
        this.openDialogViajero();
        }
        if (data === 1) {

// tslint:disable-next-line: max-line-length
          this.alquilarcasa.AlquilarCasa(this.id_casarural, dni, telefono, direccion, localidad, cp, plazas, this.fechaentradavalue, this.fechasalidavalue, comentario, this.token)
          .subscribe(
            (data: string) => {
              if (data === 'correo_enviado') {
                this.snackBar.open('Se ha enviado un correo con los datos del alquiler al propietario de la casa', '', {
                  duration: 3000,
                });
              }
              if (data === 'error') {
                this.snackBar.open('Hubo un error mientras se enviaban lo datos', '', {
                  duration: 3000,
                });
              }
            },
            error => {
              this.snackBar.open('Fallo al conectar con el servidor', '', {
                duration: 3000,
              });
            }
          );
        }
        if (data === 'error') {
        }
      },
      error => {
      }
    );
  }

  publicarComentario() {
    if (this.formcom.invalid) {
      return;
    }

    const comentario = this.formcom.value.comentario;
    this.comprobarviajero.comprobarViajeroConectado(this.token, 'conectado')
    .subscribe(
      (data: any) => {
        if (data === 0) {
        this.openDialogViajero();
        }
        if (data === 1) {

          this.comentarioService.comentar(this.token, this.id_casarural, comentario)
          .subscribe(
            (data: string) => {
              if (data === 'exito') {
                window.location.reload();
                this.snackBar.open('Se ha publicado el comentario correctamente', '', {
                  duration: 3000,
                });
              }
              if (data === 'error') {
                this.snackBar.open('Hubo un error mientras se publicaba el comentario', '', {
                  duration: 3000,
                });
              }
            },
            error => {
              this.snackBar.open('Fallo al conectar con el servidor', '', {
                duration: 3000,
              });
            }
          );
        }
        if (data === 'error') {
        }
      },
      error => {
      }
    );
  }

  cerrarSesion() {
    this.cookieService.delete('token');
    this.router.navigate(['/', 'home']);
  }

}
