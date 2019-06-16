import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {  MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


// Servicios

import { ObtenerLocalidadesProvinciasService } from '../../servicios/obtener-localidades-provincias.service';
import { AnadirAlojamientoService } from '../../servicios/anadir-alojamiento.service';

@Component({
  selector: 'app-anadir-alojamiento',
  templateUrl: './anadir-alojamiento.component.html',
  styleUrls: ['./anadir-alojamiento.component.css']
})
export class AnadirAlojamientoComponent implements OnInit {

  provincias: any;
  localidades: any;
  formNuevoAlojamiento: FormGroup;
  nombre: string;
  provincia: string;
  localidad: string;
  direccion: string;
  telefono: string;
  telefono2: string;
  correo: string;
  precio: number;
  plazas: number;
  descripcion: string;
  urls: any = [];
  submitted = false;
  correoValue: string;
  token: string;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Descripción*',
    translate: 'no',
    uploadUrl: 'v1/images',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    public obtenerLocalidadesProvincias: ObtenerLocalidadesProvinciasService,
    public anadiralojamiento: AnadirAlojamientoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router,
    ) { }

  ngOnInit() {

    this.token = this.cookieService.get('token');

    this.obtenerLocalidadesProvincias.obtenerLocalidadesProvincias('provincia')
    .subscribe(
      data => {
        this.provincias = data;
      },
      error => {

      }
    );

    this.formNuevoAlojamiento = this.fb.group({
      nombre: [this.nombre, [Validators.required]],
      provincia: [this.provincia, [Validators.required]],
      localidad: [this.localidad, [Validators.required]],
      direccion: [this.direccion, [Validators.required]],
      telefono: [this.telefono, [Validators.required]],
      telefono2: [this.telefono2],
      correo: [this.correo, [Validators.required, Validators.email]],
      precio: [this.precio, [Validators.required]],
      plazas: [this.plazas, [Validators.required]],
      descripcion: [this.descripcion, [Validators.required]],
    });
  }

  get f() {
    return this.formNuevoAlojamiento.controls;
  }

  cargarLocalidad(idProvincia) {
    this.obtenerLocalidadesProvincias.obtenerLocalidadesProvincias(idProvincia)
    .subscribe(
      data => {
        this.localidades = data;
      },
      error =>{

      }
    )
  }

  onSelectFile(event) {

    if (event.target.files.length === 0) {
      return;
    }
 
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    if (event.target.files && event.target.files[0]) {
        const filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();

                reader.onload = (event) => {
                   this.urls.push(event.target['result']);
                },

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  anadirAlojamiento() {

    this.correoValue = this.formNuevoAlojamiento.value.correo;

    if (this.formNuevoAlojamiento.invalid || this.urls.length === 0) {
      this.submitted = true;
      return;
  } else {
    this.submitted = false;
  }

    const nombre = this.formNuevoAlojamiento.value.nombre;
    const localidad = this.formNuevoAlojamiento.value.localidad;
    const direccion = this.formNuevoAlojamiento.value.direccion;
    const telefono = this.formNuevoAlojamiento.value.telefono;
    const telefono2 = this.formNuevoAlojamiento.value.telefono2;
    const precio = this.formNuevoAlojamiento.value.precio;
    const plazas = this.formNuevoAlojamiento.value.plazas;
    const descripcion = this.formNuevoAlojamiento.value.descripcion;
    const imagen0 = this.urls[0];
    const imagen1 = this.urls[1];
    const imagen2 = this.urls[2];
    const imagen3 = this.urls[3];
    const imagen4 = this.urls[4];
// tslint:disable-next-line: max-line-length
    this.anadiralojamiento.anadirAlojamiento(this.token, nombre, localidad, direccion, telefono, telefono2, this.correoValue, precio, plazas, descripcion, imagen0, imagen1, imagen2, imagen3, imagen4)
    .subscribe(
      (data: string) => {
        if (data === 'exito') {
          this.snackBar.open('Alojamiento añadido con éxito', '', {
            duration: 3000,
          });
        }
        if (data === 'error') {
          this.snackBar.open('Hubo un error mientros se añadía el alojamiento', '', {
            duration: 3000,
          });
        }
      },
      error => {
        this.snackBar.open('Fallo al conectar con el servidor', '', {
        duration: 3000,
      }
    );
  }
    );
}

cerrarSesion() {
  this.cookieService.delete('token');
  this.router.navigate(['/', 'home']);
}
}
