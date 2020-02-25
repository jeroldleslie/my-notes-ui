import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/model/auth';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'notes-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading =false;
  regForm;
  matcher = new MyErrorStateMatcher();

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);
  name = new FormControl('', [
    Validators.required,
  ]);
  
  constructor(
    private authSerive: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: User
  ) {
    this.regForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.regForm.valid) {
      this.authSerive.Signup(this.regForm.value).subscribe(res => {
        //
        console.log(res);
        this.regForm.reset();
        this.dialogRef.close();
        /* if (res.status == "SUCCESS") { */
        this.ngZone.run(() => this.router.navigateByUrl('/login'))
        /* } */
        //this.ngZone.run(() => this.router.navigateByUrl('/issues-list'))
        
      });
    }
    

    //console.warn('Your order has been submitted', customerData);
  }

}
