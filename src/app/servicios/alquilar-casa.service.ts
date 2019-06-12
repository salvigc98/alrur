import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlquilarCasaService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  AlquilarCasa(id_casarural: any, dni: string, telefono: number, direccion: string, localidad: string, cp: number, plazas: number, fechaentrada:any, fechasalida:any, comentario: string, token: any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      id_casarural: id_casarural,
      dni: dni,
      telefono: telefono,
      direccion: direccion,
      localidad: localidad,
      cp: cp,
      plazas: plazas,
      fechaentrada: fechaentrada,
      fechasalida: fechasalida,
      comentario: comentario,
      token: token,
    });

    // console.log(postParams);

    this.navegacionUrl = "http://localhost/alrur/alojamientos/alquilar_alojamiento.php";
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
