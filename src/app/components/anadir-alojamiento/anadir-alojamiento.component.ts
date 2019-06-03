import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


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
  telefono: string;
  telefono2: string;
  correo: string;
  precio: number;
  descripcion: string;
  urls = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Descripción...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    public obtenerLocalidadesProvincias: ObtenerLocalidadesProvinciasService,
    public anadiralojamiento: AnadirAlojamientoService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    ) { }

  ngOnInit() {
    this.obtenerLocalidadesProvincias.obtenerLocalidadesProvincias('provincia')
    .subscribe(
      data =>{
        this.provincias = data;
      },
      error =>{

      }
    );

    this.formNuevoAlojamiento = this.fb.group({
      nombre: [this.nombre, [Validators.required]],
      provincia: [this.provincia, [Validators.required]],
      localidad: [this.localidad, [Validators.required]],
      telefono: [this.telefono, [Validators.required]],
      telefono2: [this.telefono2, [Validators.required]],
      correo: [this.correo, [Validators.required]],
      precio: [this.precio, [Validators.required]],
      descripcion: [this.descripcion, [Validators.required]],
      // ContrasenaInicio: [this.ContrasenaInicio, [Validators.required, Validators.minLength(6)]]
    });
  }

  cargarLocalidad(idProvincia){
    this.obtenerLocalidadesProvincias.obtenerLocalidadesProvincias(idProvincia)
    .subscribe(
      data =>{
        this.localidades = data;
        // console.log(this.localidades);
      },
      error =>{

      }
    )
  }

  onSelectFile(event) {

    if (event.target.files.length === 0)
      return;
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event) => {
                  // console.log(event.target['result']);
                   this.urls.push(event.target['result']);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  anadirAlojamiento() {
    let token = this.cookieService.get('token');
    let nombre = this.formNuevoAlojamiento.value.nombre;
    let localidad = this.formNuevoAlojamiento.value.localidad;
    let telefono = this.formNuevoAlojamiento.value.telefono;
    let telefono2 = this.formNuevoAlojamiento.value.telefono2;
    let correo = this.formNuevoAlojamiento.value.correo;
    let precio = this.formNuevoAlojamiento.value.precio;
    let descripcion = this.formNuevoAlojamiento.value.descripcion;
    let imagen0 = this.urls[0];
    let imagen1 = this.urls[1];
    let imagen2 = this.urls[2];
    let imagen3 = this.urls[3];
    let imagen4 = this.urls[4];
    this.anadiralojamiento.anadirAlojamiento(token, nombre, localidad, telefono, telefono2, correo, precio, descripcion, imagen0, imagen1, imagen2, imagen3, imagen4);
    // console.log(this.urls[0]);
    // console.log(this.formNuevoAlojamiento.value);
  }
}
