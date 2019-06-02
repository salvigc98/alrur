import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObtenerLocalidadesProvinciasService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  obtenerLocalidadesProvincias(accion: any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      accion: accion,
    });

    this.navegacionUrl = "http://localhost/alrur/anadir_alojamiento/obtener_provincia_localidad.php";
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
