import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnadirAlojamientoService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  anadirAlojamiento(token: any, nombre: any, localidad: any, telefono: any, telefono2: any, correo:any, precio:any, plazas:any, descripcion: any, imagen0:any, imagen1:any, imagen2:any, imagen3:any, imagen4:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      token: token,
      nombre: nombre,
      localidad: localidad,
      telefono: telefono,
      telefono2: telefono2,
      correo: correo,
      precio: precio,
      plazas: plazas,
      descripcion: descripcion,
      imagen0: imagen0,
      imagen1: imagen1,
      imagen2: imagen2,
      imagen3: imagen3,
      imagen4: imagen4,
    });

    // console.log(postParams);
    this.navegacionUrl = "http://localhost/alrur/alojamientos/anadir_alojamiento.php";
    return this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .pipe(map(
        data => {
          // console.log(data);
          return data;
        },
        error => {
          // console.log(error);
          return error;
        }
      ));


  }
}
