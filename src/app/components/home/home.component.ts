import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios

import { ListarAlojamientosService } from '../../servicios/listar-alojamientos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alojamientos: any;

  constructor(
    private router:Router,
    public listaralojamiento: ListarAlojamientosService,
  ) { }

  ngOnInit() {
    this.listaralojamiento.listarAlojamientoUsuarios()
    .subscribe(
      data =>{
        this.alojamientos = data;
        console.log(this.alojamientos);
      },
      error =>{
        console.log(error);
      })
  }

  verAlojamiento(id_casarural){
    // console.log(id_casarural);
    this.router.navigate(['/', 'alquilarCasarural', id_casarural]);
  }

}
