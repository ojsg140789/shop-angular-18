import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { AuthService } from '@app/services/auth.service';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

import { APP_CONSTANTS } from '@app/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterModule,
    SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  fb = inject(FormBuilder);
  authService = inject(AuthService);
  loginForm: FormGroup;
  router = inject(Router);
  errorMessage: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    // const rawForm = this.loginForm.getRawValue();
    // this.authService.login(
    //   rawForm.email, 
    //   rawForm.password
    // ).subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/');
    //   },
    //   error: (error) => {
    //     let _message = {
    //       title: 'Error',
    //       text: 'Ocurrio un error en el servicio'
    //     }
    //     this.errorMessage = error.code;
    //     if(this.errorMessage == APP_CONSTANTS.AUTH.INVALIDCREDENTIALS) {
    //       _message.title = APP_CONSTANTS.AUTH.INVALIDCREDENTIALSMESSAGE
    //       _message.text = ''
    //     }
    //     Swal.fire({
    //       title: _message.title,
    //       text: _message.text,
    //       icon: 'info'
    //     });
    //   }
    // });
  }
}
