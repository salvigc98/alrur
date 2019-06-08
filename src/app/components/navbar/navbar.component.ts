import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { LoginComponent } from '../navbar/login/login.component';
import { LoginPropietarioComponent } from '../navbar/login-propietario/login-propietario.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Servicios

import { ObtenerLocalidadesProvinciasService } from '../../servicios/obtener-localidades-provincias.service';
import { ConsultarPrecioService } from '../../servicios/consultar-precio.service';
import { FiltrarCasasService } from '../../servicios/filtrar-casas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // selected = 'option2';
  // usuario:string;
  // login:boolean = false;

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

  // get tickInterval(): number | 'auto' {
  //   return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  // }
  // set tickInterval(value) {
  //   this._tickInterval = coerceNumberProperty(value);
  // }
  // private _tickInterval = 1;

  constructor(
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

  filtrarCasas(){
    let provincia = this.formfiltrar.value.provincia;
    let plazas = this.formfiltrar.value.plazas;
    let precio = this.formfiltrar.value.precio;
    this.filtrarcasas.filtrarCasas(provincia, plazas, precio)
    .subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
  }

}



