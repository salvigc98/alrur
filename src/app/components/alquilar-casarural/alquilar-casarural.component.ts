import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

// Servicios

import { ListarAlojamientosService } from '../../servicios/listar-alojamientos.service';
import { ConsultarDisponibilidadService } from '../../servicios/consultar-disponibilidad.service';

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

  constructor(
    private route: ActivatedRoute,
    public listaralojamiento: ListarAlojamientosService,
    public consultardisponibilidad: ConsultarDisponibilidadService,
    private fb: FormBuilder,
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
        fechasalida: [this.fechasalida, [Validators.required]]
      });
  }

  consultarDisp() {
    console.log(this.formdisp.value);
    let fechaEntrada = this.formdisp.value.fechaentrada;
    let fechaSalida = this.formdisp.value.fechasalida;
    fechaEntrada = formatDate(fechaEntrada, 'dd/MM/yyyy', 'en-US');
    fechaSalida = formatDate(fechaSalida, 'dd/MM/yyyy', 'en-US');
    this.consultardisponibilidad.consultarDisponibilidad(this.id_casarural, fechaEntrada, fechaSalida);
    // console.log(fechaEntrada);
  }
}
