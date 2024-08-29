import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Cliente } from '@app/models/cliente';
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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, , Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    const rawForm = this.registerForm.getRawValue();
    let _userInfo: Cliente = {
      nombre: rawForm.nombre,
      apellido: rawForm.apellido,
      direccion: rawForm.direccion,
      correo: rawForm.correo,
      password: rawForm.password
    }
    this.authService.register(
      _userInfo
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        Swal.fire({
          title: 'Registrado',
          text: 'Inicie sesión',
          icon: 'info'
        });
      },
      error: (error) => {
        let _message = {
          title: 'Error',
          text: error.error.title
        }
        Swal.fire({
          title: _message.title,
          text: _message.text,
          icon: 'info'
        });
      }
    });
  }
}
