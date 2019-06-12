import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-eliminar-alojamiento',
  templateUrl: './eliminar-alojamiento.component.html',
  styleUrls: ['./eliminar-alojamiento.component.css']
})
export class EliminarAlojamientoComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EliminarAlojamientoComponent>
  ) { }

  ngOnInit() {
  }

  comprobarEliminar(data) {
    this.dialogRef.close(data);
    // console.log(data);
  }
}
