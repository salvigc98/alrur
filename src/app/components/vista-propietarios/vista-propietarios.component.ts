import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  anadirCasa() {
    this.router.navigate(['/', 'anadirAlojamiento']);
  }

  eliminarAlojamiento(id_casarural){
    this.eliminaralojamiento.eliminarAlojamiento(id_casarural)
    .subscribe((data:any) =>{
      if(data == 'exito'){
        this.listarCasasRurales(this.token);
      }
    },
    error =>{
      console.log(error);
    });
  }
}
