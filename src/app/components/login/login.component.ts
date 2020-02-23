import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder,FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'notes-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;
  loading = false;
  loginForm;
  errorMessage="";
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  /* loginForm; */
  constructor(
    private authSerive: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    /* this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    }); */
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
    
  }

  

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authSerive.Signin(this.loginForm.value).subscribe(res => {
        this.errorMessage = ""
        this.loading = false;
        console.log(res);
        console.log(res.status);
        if (res.status == "SUCCESS") {
          this.ngZone.run(() => this.router.navigateByUrl('/home'))
        }else if (res.status == "FAILURE") {
          this.errorMessage = res.message
          if(res.message == "Incorrect password"){
            this.passwordElement.nativeElement.focus();
          }
          if(res.message == "Email not found"){
            this.emailElement.nativeElement.focus();
          }
        }
        //this.ngZone.run(() => this.router.navigateByUrl('/issues-list'))
        //this.loginForm.reset();
      });
    }
    

    //console.warn('Your order has been submitted', customerData);
  }
}
