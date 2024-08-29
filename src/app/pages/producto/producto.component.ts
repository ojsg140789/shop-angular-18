import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tienda } from '@app/models/tienda';
import { ProductsService } from '@app/services/products.service';
import { TiendaService } from '@app/services/tienda.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule,
    SweetAlert2Module
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  productoService = inject(ProductsService);
  tiendaService = inject(TiendaService);
  router = inject(Router);
  productoForm: FormGroup;
  id: string = '';
  tiendas: Tienda[] = [];

  constructor(private location: Location) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      stock: ['', Validators.required],
      tiendaId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.tiendaService.getAllTiendas().subscribe({
      next: (tiendas) => {
        this.tiendas = tiendas;
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
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id) {
        this.productoService.getProductoById(this.id).subscribe({
          next: (producto) => {
            this.productoForm.patchValue({
              codigo: producto.codigo,
              descripcion: producto.descripcion,
              precio: producto.precio,
              imagen: producto.imagen,
              stock: producto.stock,
              tiendaId: producto.tiendaId,
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
    let rawForm = this.productoForm.getRawValue();
    if(this.id) {
      rawForm.id = this.id;
      this.productoService.updateProducto(this.id, rawForm).subscribe({
        next: tienda => {
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
    } else {
      this.productoService.createProducto(rawForm).subscribe({
        next: producto => {
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
  } 

  goBack() {
    this.location.back();
  }
}
