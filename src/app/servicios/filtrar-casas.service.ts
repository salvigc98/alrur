import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiltrarCasasService {
  navegacionUrl: any;

  constructor(public http: HttpClient,) { }

  filtrarCasas(provincia: number, plazas: number, precio: number){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      provincia: provincia,
      plazas: plazas,
      precio: precio,
    });

    this.navegacionUrl = "http://localhost/alrur/alojamientos/filtrar_casa.php";
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
