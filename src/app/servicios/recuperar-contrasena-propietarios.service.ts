import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContrasenaPropietariosService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  recuperarContrasenaPropietario(correo:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      correo: correo,
    });

    this.navegacionUrl = "http://localhost/alrur/usuarios/correo_recuperar_contrasena_propietario.php";
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
