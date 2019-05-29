import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprobarPropietarioService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  comprobarPropietario(correo:any, contrasena:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      correo: correo,
      contrasena: contrasena,
    });

    this.navegacionUrl = "http://localhost/alrur/usuarios/comprobar_propietario.php";
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
