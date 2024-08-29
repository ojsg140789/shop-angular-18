import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TiendaService } from '@app/services/tienda.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule,
    SweetAlert2Module
  ],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  tiendaService = inject(TiendaService);
  router = inject(Router);
  tiendaForm: FormGroup;
  id: string = '';

  constructor() {
    this.tiendaForm = this.fb.group({
      sucursal: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id) {
        this.tiendaService.getTiendaById(this.id).subscribe({
          next: (tienda) => {
            this.tiendaForm.patchValue({
              sucursal: tienda.sucursal,
              direccion: tienda.direccion
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

  guardar() {
    let rawForm = this.tiendaForm.getRawValue();
    if(this.id) {
      rawForm.id = this.id;
      this.tiendaService.updateTienda(this.id, rawForm).subscribe({
        next: tienda => {
          Swal.fire({
            title: 'Guardado',
            text: '',
            icon: 'info'
          });
          this.router.navigate(['/tiendas']);
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
    } else {
      this.tiendaService.createTienda(rawForm).subscribe({
        next: tienda => {
          Swal.fire({
            title: 'Guardado',
            text: '',
            icon: 'info'
          });
          this.router.navigate(['/tiendas']);
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
  }
}
