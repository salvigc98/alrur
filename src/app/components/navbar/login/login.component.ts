import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
      private dialogRef: MatDialogRef<LoginComponent>,
      // @Inject(MAT_DIALOG_DATA) data
  ) {
    // this.description = data.description;
   }

  ngOnInit() {
  }

  form: FormGroup;
  description:string;



  // ngOnInit() {
  //     this.form = this.fb.group({
  //         description: [this.description, []]
  //     });
  // }

  save() {
      // this.dialogRef.close(this.form.value);
      console.log('funciona');
  }

  close() {
      this.dialogRef.close();
  }

  crearCuenta(){
    // console.log('crea');
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = "350px";
    dialogConfig.height = "500px";

    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
  // };


    this.dialog.open(RegistroComponent, dialogConfig);
  }

}
