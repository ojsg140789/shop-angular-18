import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ClienteService } from '@app/services/cliente.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule,
    SweetAlert2Module
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  clienteService = inject(ClienteService);
  authService = inject(AuthService);
  router = inject(Router);
  clienteForm: FormGroup;
  id: string = '';

  constructor(private location: Location) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id) {
        this.clienteService.getClienteById(this.id).subscribe({
          next: (cliente) => {
            this.clienteForm.patchValue({
              nombre: cliente.nombre,
              apellido: cliente.apellido,
              direccion: cliente.direccion,
              correo: cliente.correo,
              password: cliente.password
            });
          },
          error: () => {
            let _message = {
              title: 'Error',
              text: 'Ocurrio un error en el servicio'
            }
            Swal.fire({
              title: _message.title,
              text: _message.text,
              icon: 'info'
            });
          }
        });
      }
    });
  }

  guardar(){
    let rawForm = this.clienteForm.getRawValue();
    rawForm.id = this.id;
    this.clienteService.updateCliente(this.id, rawForm).subscribe({
      next: cliente => {
        Swal.fire({
          title: 'Guardado',
          text: '',
          icon: 'info'
        });
        this.location.back();
      },
      error: () => {
        let _message = {
          title: 'Error',
          text: 'Ocurrio un error en el servicio'
        }
        Swal.fire({
          title: _message.title,
          text: _message.text,
          icon: 'info'
        });
      }
    });
  } 

  goBack() {
    this.location.back();
  }

  eliminar() {
    Swal.fire({
      title: "¿Eliminar cuenta?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(this.id).subscribe({
          next: () => {
            this.authService.logout();
          },
          error: () => {
            let _message = {
              title: 'Error',
              text: 'Ocurrio un error en el servicio'
            }
            Swal.fire({
              title: _message.title,
              text: _message.text,
              icon: 'info'
            });
          }
        });
      }
    });
  }

}
