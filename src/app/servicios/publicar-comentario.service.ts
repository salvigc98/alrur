import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicarComentarioService {
  navegacionUrl: any;

  constructor(public http: HttpClient) { }

  comentar(token: string, casarural: number, comentario: string) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      token: token,
      casarural: casarural,
      comentario: comentario,
    });

    this.navegacionUrl = 'http://localhost/alrur/alojamientos/publicar_comentario.php';
    return this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .pipe(map(
        data => {
          return data;
        },
        error => {
          return error;
        }
      ));
  }

  listarComentarios(casarural: number) {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const postParams = JSON.stringify({
      casarural: casarural,
    });

    this.navegacionUrl = 'http://localhost/alrur/alojamientos/listar_comentarios.php';
    return this.http.post(this.navegacionUrl, postParams, { headers: headers })
      .pipe(map(
        data => {
          return data;
        },
        error => {
          return error;
        }
      ));
  }
}
