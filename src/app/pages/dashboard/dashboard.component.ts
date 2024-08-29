import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

import { ProductsService } from '@app/services/products.service';
import { Product } from '@app/models/product';
import { ProductItemComponent } from "../../components/product-item/product-item.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, SweetAlert2Module, FontAwesomeModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  producstsService = inject(ProductsService);

  products: Product[] = [];
  

  ngOnInit() {
    this.producstsService.getAllProductos().subscribe({
      next: products => {
        this.products = products;
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
