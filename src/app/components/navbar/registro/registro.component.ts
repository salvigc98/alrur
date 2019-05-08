import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
      private dialogRef: MatDialogRef<RegistroComponent>,
      // @Inject(MAT_DIALOG_DATA) data
  ) {
    // this.description = data.description;
   }

  ngOnInit() {
  }

  form: FormGroup;
  description:string;

}
