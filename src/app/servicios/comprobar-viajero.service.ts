import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComprobarViajeroService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  comprovarViajero(usuario:any, contraseña:any){
    let headers: any = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let postParams = JSON.stringify({
      usuario: usuario,
      contraseña: contraseña,
    });

    this.navegacionUrl = "http://localhost/alrur/comprobar_usuarios/comprobar_viajero.php";
    this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error); 
        }
      );


  }
}
