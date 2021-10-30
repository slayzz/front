import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('LKDJFLKDFJ');
    console.log(this.loginForm.invalid);
    this.authService.login(this.loginForm.value).pipe(
      map(token => this.router.navigate(['admin']))
    )
  }


  // login() {
  //   this.authService.login('superlol@go.com', '123').subscribe(data => console.log('SUCCESS', data));
  // }
}
