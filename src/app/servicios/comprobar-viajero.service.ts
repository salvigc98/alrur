import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComprobarViajeroService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  comprovarViajero(correo:any, contrasena:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      correo: correo,
      contrasena: contrasena,
    });

    this.navegacionUrl = "http://localhost/alrur/comprobar_usuarios/comprobar_viajero.php";
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
