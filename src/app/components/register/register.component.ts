import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

class CustomValidators {
  static passwordContainsNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex = /\d/;

    return regex.test(control.value) && control.value !== null
      ? null
      : {
          passwordInvalid: true,
        };
  }

  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    return password === passwordConfirm &&
      password !== null &&
      passwordConfirm !== null
      ? null
      : {
          passwordsNotMatching: true,
        };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        passwordConfirm: [null, [Validators.required]],
      },
      {
        validators: CustomValidators.passwordMatch
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('SUPERLOL');
    if (this.registerForm?.invalid) {
      return;
    }
    console.log(this.registerForm?.value);

    this.authService
      .register(this.registerForm?.value)
      .pipe(map((user) => this.router.navigate(['login'])))
      .subscribe();
  }
}
