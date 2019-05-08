import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from '../navbar/login/login.component';

export interface DialogData {
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // selected = 'option2';

  constructor(public dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = "300px";
    dialogConfig.height = "400px";

    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
  // };


    this.dialog.open(LoginComponent, dialogConfig);
}

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });


  // viajero(viajero:any) {
  //   console.log(viajero);
  // }

  ngOnInit() {
  }

}



