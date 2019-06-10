import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarPropietarioService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  registrarPropietario(NombreRegistro:any, NifRegistro:any, ContrasenaRegistro:any, DireccionRegistro:any, TelefonoRegistro:any, CorreoRegistro:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      NombreRegistro: NombreRegistro,
      NifRegistro: NifRegistro,
      ContrasenaRegistro: ContrasenaRegistro,
      DireccionRegistro: DireccionRegistro,
      TelefonoRegistro: TelefonoRegistro,
      CorreoRegistro: CorreoRegistro,
    });

    // console.log(postParams);

    this.navegacionUrl = "http://localhost/alrur/usuarios/email_verificacion_propietario.php";
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
