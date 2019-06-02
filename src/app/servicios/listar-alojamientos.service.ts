import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListarAlojamientosService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  listarAlojamientoPropietario(token: any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      token: token,
    });

    // console.log(postParams);
    this.navegacionUrl = "http://localhost/alrur/alojamientos/listar_alojamiento_propietario.php";
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

  listarAlojamientoUsuarios(){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    // let postParams = JSON.stringify({
    //   token: token,
    // });

    // console.log(postParams);
    this.navegacionUrl = "http://localhost/alrur/alojamientos/listar_alojamiento_usuarios.php";
    return this.http.post(this.navegacionUrl, { headers: headers })
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
