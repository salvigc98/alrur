import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComprobarUsuariosService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  comprovarViajero(correo: string, contrasena: string, accion: string) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      correo: correo,
      contrasena: contrasena,
      accion: accion,
    });

    this.navegacionUrl = 'http://localhost/alrur/usuarios/comprobar_usuario.php';
    return this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .pipe(map(
        data => {
          return data;
        },
        error => {
          return error;
        }
      ));
  }

  comprovarViajeroConectado(token: string, accion: string) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      token: token,
      accion: accion,
    });

    this.navegacionUrl = 'http://localhost/alrur/usuarios/comprobar_usuario.php';
    return this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .pipe(map(
        data => {
          return data;
        },
        error => {
          return error;
        }
      ));
  }

  comprobarPropietario(correo: string, contrasena: string, accion: string) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      correo: correo,
      contrasena: contrasena,
      accion: accion,
    });

    this.navegacionUrl = 'http://localhost/alrur/usuarios/comprobar_usuario.php';
    return this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .pipe(map(
        data => {
          return data;
        },
        error => {
          return error;
        }
      ));


  }
}
