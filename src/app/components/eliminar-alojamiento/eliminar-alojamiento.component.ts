import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-eliminar-alojamiento',
  templateUrl: './eliminar-alojamiento.component.html',
  styleUrls: ['./eliminar-alojamiento.component.css']
})
export class EliminarAlojamientoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EliminarAlojamientoComponent>
  ) { }

  ngOnInit() {
  }

  comprobarEliminar(data) {
    this.dialogRef.close(data);
  }
}
