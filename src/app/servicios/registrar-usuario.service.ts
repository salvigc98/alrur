import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  registrarViajero(NombreRegistro: string, ApellidosRegistro: string, ContrasenaRegistro: string, CorreoRegistro: string, accion: string) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      NombreRegistro: NombreRegistro,
      ApellidosRegistro: ApellidosRegistro,
      ContrasenaRegistro: ContrasenaRegistro,
      CorreoRegistro: CorreoRegistro,
      accion: accion,
    });

    this.navegacionUrl = 'http://localhost/alrur/usuarios/email_verificacion.php';
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

// tslint:disable-next-line: max-line-length
  registrarPropietario(NombreRegistro: string, NifRegistro: string, ContrasenaRegistro: string, DireccionRegistro: string, TelefonoRegistro: string, CorreoRegistro: string, accion: string) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      NombreRegistro: NombreRegistro,
      NifRegistro: NifRegistro,
      ContrasenaRegistro: ContrasenaRegistro,
      DireccionRegistro: DireccionRegistro,
      TelefonoRegistro: TelefonoRegistro,
      CorreoRegistro: CorreoRegistro,
      accion: accion,
    });

    this.navegacionUrl = 'http://localhost/alrur/usuarios/email_verificacion.php';
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
