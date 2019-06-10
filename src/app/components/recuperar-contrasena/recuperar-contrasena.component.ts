import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iguales } from '../shared/must-match-validator/must-match-validator.component';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

// Servicios

import { RecuperarContrasenaService } from '../../servicios/recuperar-contrasena.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  token: string;
  accion: string;
  formContrasena: FormGroup;
  contrasena1: string;
  contrasena2: string;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public recuperarcontrasena: RecuperarContrasenaService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.token = data.token;
        this.accion = data.accion;
      }
    );

    this.formContrasena = this.fb.group({
      contrasena1: [this.contrasena1, [Validators.required, Validators.minLength(6)]],
      contrasena2: [this.contrasena2, [Validators.required]]
    },
    {
      validator: iguales('contrasena1', 'contrasena2')
    }

    );
  }

  get f() {
    return this.formContrasena.controls;
  }

  cambiarContrasena() {
    this.submitted = true;

    if (this.formContrasena.invalid) {
      return;
  }

  let contrasena = this.formContrasena.value.contrasena1;
    this.recuperarcontrasena.actualizarContrasena(contrasena, this.token, this.accion)
 .subscribe(
   (data: string) => {
    if(data == 'exito'){
      this.snackBar.open('Contraseña actualizada con éxito', '', {
        duration: 3000,
      });
    }
    if(data == 'error'){
      this.snackBar.open('Ha habido un error mientras se restablecía la contraseña', '', {
        duration: 3000,
      });
    }
   },
   error => {
    this.snackBar.open('Fallo al conectar con el servidor', '', {
      duration: 3000,
    });
   }
 )
}

}
