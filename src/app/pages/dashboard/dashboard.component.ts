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
  filteredProducts: Product[] = [];
  faFilter = faFilter;
  categorias = ['Gorras', 'Playeras', 'Shorts'];
  order = [
    { value: 'asc', text: 'Menor precio'},
    { value: 'des', text: 'Mayor precio'}
  ];
  calificaciones = [
    { value: '1', text: '1 Estrella'},
    { value: '2', text: '2 Estrellas'},
    { value: '3', text: '3 Estrellas'},
    { value: '4', text: '4 Estrellas'},
    { value: '5', text: '5 Estrellas'}
  ];
  selectedCategoria: string = '';
  sortByPrice: string = '';
  minPrice?: string = '';
  maxPrice?: string = '';
  minCalificacion?: string = '';

  ngOnInit() {
    // this.producstsService.getProducts().subscribe({
    //   next: products => {
    //     this.products = products;
    //     this.filteredProducts = this.products;
    //   },
    //   error: () => {
    //     let _message = {
    //       title: 'Error',
    //       text: 'Ocurrio un error en el servicio'
    //     }
    //     Swal.fire({
    //       title: _message.title,
    //       text: _message.text,
    //       icon: 'info'
    //     });
    //   }
    // });
  }

  filterProducts(
    selectedCategoria?: string,
    sortByPrice?: string,
    minPrice?: string,
    maxPrice?: string,
    minCalificacion?: string
  ): void {

    if (selectedCategoria) {
      let filtered = this.products.filter(product => product.categoria == this.selectedCategoria);
      this.filteredProducts = filtered;
    }
    
    const minPriceNum = isNaN(parseFloat(minPrice || '')) == true ? 0 : parseFloat(minPrice || '');
    const maxPriceNum = isNaN(parseFloat(maxPrice || '')) == true ? 9999999999 : parseFloat(maxPrice || '');
    
    let filteredMaxPriceNum = this.filteredProducts.filter(product => product.price >= minPriceNum && product.price <= maxPriceNum);
    this.filteredProducts = filteredMaxPriceNum;
  
    const minCalificacionNum = parseFloat(minCalificacion || '');
    if (!isNaN(minCalificacionNum)) {
      let filtered = this.filteredProducts.filter(product => product.calificacion === minCalificacionNum);
      this.filteredProducts = filtered;
    }
    
    if(sortByPrice == 'asc') {
      let filtered = [...this.filteredProducts].sort((a, b) => a.price - b.price);
      this.filteredProducts = filtered;
    } else {
      let filtered = [...this.filteredProducts].sort((a, b) => b.price - a.price);
      this.filteredProducts = filtered;
    }
  }

  cleanFilterProducts() {
    this.selectedCategoria = '';
    this.sortByPrice = '';
    this.minPrice = '';
    this.maxPrice = '';
    this.minCalificacion = '';
    this.filteredProducts = this.products;
  }
}
