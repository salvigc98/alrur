import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { LoginComponent } from '../navbar/login/login.component';
import { LoginPropietarioComponent } from '../navbar/login-propietario/login-propietario.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Servicios

import { ListarAlojamientosService } from '../../servicios/listar-alojamientos.service';
import { ObtenerLocalidadesProvinciasService } from '../../servicios/obtener-localidades-provincias.service';
import { ConsultarPrecioService } from '../../servicios/consultar-precio.service';
import { FiltrarCasasService } from '../../servicios/filtrar-casas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alojamientos: any = [];
  autoTicks = false;
  disabled = false;
  invert = false;
  max: number;
  min: number;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  formfiltrar: FormGroup;
  provincia: string;
  plazas: number;
  precio: number;
  provincias: any;


  constructor(
    private router:Router,
    public listaralojamiento: ListarAlojamientosService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public obtenerProvincias: ObtenerLocalidadesProvinciasService,
    public consultarPrecio: ConsultarPrecioService,
    public filtrarcasas: FiltrarCasasService,
  ) { }

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

openDialogPropietario() {

  const dialogConfig = new MatDialogConfig();

  // dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.width = '350px';
  dialogConfig.height = '500px';

  dialogConfig.data = {
};


const dialogRef = this.dialog.open(LoginPropietarioComponent, dialogConfig);


}


  ngOnInit() {
    this.listaralojamiento.listarAlojamientoUsuarios()
    .subscribe(
      data =>{
        this.alojamientos = data;
        console.log(this.alojamientos.length);
      },
      error =>{
        console.log(error);
      });

    this.obtenerProvincias.obtenerLocalidadesProvincias('provincia')
    .subscribe(
      data => {
        this.provincias = data;
        // console.log(this.provincias);
      },
      error => {
        console.log(error);
      }
    );

    this.consultarPrecio.consultarPrecio()
    .subscribe(
      data => {
        // this.provincias = data;
        console.log(data);
        this.max = data['maximo'];
        this.min = data['minimo'];
      },
      error => {
        console.log(error);
      }
    );

    this.formfiltrar = this.fb.group({
      provincia: [this.provincia],
      plazas: [this.plazas],
      precio: [this.precio],
    });
  }

  verAlojamiento(id_casarural){
    // console.log(id_casarural);
    this.router.navigate(['/', 'alquilarCasarural', id_casarural]);
  }

  filtrarCasas(){
    let provincia = this.formfiltrar.value.provincia;
    let plazas = this.formfiltrar.value.plazas;
    let precio = this.formfiltrar.value.precio;
    this.filtrarcasas.filtrarCasas(provincia, plazas, precio)
    .subscribe(
      data =>{
        // console.log(data);
        this.alojamientos = data;
      },
      error =>{
        console.log(error);
      }
    )
  }

}
