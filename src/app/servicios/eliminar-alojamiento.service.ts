import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EliminarAlojamientoService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  eliminarAlojamiento(id_casarural: any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      id_casarural: id_casarural,
    });

    // console.log(postParams);
    this.navegacionUrl = "http://localhost/alrur/alojamientos/eliminar_alojamiento.php";
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
