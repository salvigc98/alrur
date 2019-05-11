import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from '../navbar/login/login.component';

// Servicios

import { ComprobarViajeroService } from '../../servicios/comprobar-viajero.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // selected = 'option2';

  constructor(public dialog: MatDialog, public comprobarViajero: ComprobarViajeroService) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '350px';
    dialogConfig.height = '500px';

    dialogConfig.data = {
  };


  const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
    if(data){
    let usuario = data.usuario;
    let contraseña = data.contraseña;
    this.comprobarViajero.comprovarViajero(usuario, contraseña);
    }
  }
  );
}

  ngOnInit() {
  }

}



