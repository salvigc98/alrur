import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
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

}
