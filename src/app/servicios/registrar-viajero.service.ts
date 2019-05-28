import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarViajeroService {

  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  registrarViajero(NombreRegistro:any, ApellidosRegistro:any, ContrasenaRegistro:any, CorreoRegistro:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      NombreRegistro: NombreRegistro,
      ApellidosRegistro: ApellidosRegistro,
      ContrasenaRegistro: ContrasenaRegistro,
      CorreoRegistro: CorreoRegistro,
    });

    // console.log(postParams);

    this.navegacionUrl = "http://localhost/alrur/usuarios/email_verificacion_viajero.php";
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
