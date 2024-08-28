import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

import { APP_CONSTANTS } from '@app/constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule,
    SweetAlert2Module],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    const rawForm = this.registerForm.getRawValue();
    // this.authService.register(
    //   rawForm.username, 
    //   rawForm.email, 
    //   rawForm.password
    // ).subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/');
    //     Swal.fire({
    //       title: 'Bienvenido',
    //       text: 'ID: ' + this.authService.currentUserSignal()?.id,
    //       icon: 'info'
    //     });
    //   },
    //   error: (error) => {
    //     let _message = {
    //       title: 'Error',
    //       text: 'Ocurrio un error en el servicio'
    //     }
    //     this.errorMessage = error.code;
    //     if(this.errorMessage == APP_CONSTANTS.AUTH.EMAILUSED) {
    //       _message.title = APP_CONSTANTS.AUTH.EMAILUSEDMESSAGE
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
