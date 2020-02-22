import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'notes-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm;
  constructor(
    private authSerive: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.regForm = this.formBuilder.group({
      name: '',
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    this.authSerive.Signup(data).subscribe(res => {
      //
      console.log(res);
      
      /* if (res.status == "SUCCESS") { */
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
      /* } */
      //this.ngZone.run(() => this.router.navigateByUrl('/issues-list'))
      this.regForm.reset();
    });

    //console.warn('Your order has been submitted', customerData);
  }

}
