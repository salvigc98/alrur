import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContrasenaService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  recuperarContrasena(correo: string, accion: string){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      correo: correo,
      accion: accion,
    });

    this.navegacionUrl = "http://localhost/alrur/usuarios/correo_recuperar_contrasena.php";
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

  actualizarContrasena(contrasena: string, token: string, accion: string){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      contrasena: contrasena,
      token: token,
      accion: accion,
    });

    this.navegacionUrl = "http://localhost/alrur/usuarios/restablecer_contrasena.php";
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
