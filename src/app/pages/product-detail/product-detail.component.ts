import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Product } from '@app/models/product';
import { ProductsService } from '@app/services/products.service';
import { CartService } from '@app/services/cart.service';
import { CartItem } from '@app/models/cart-item';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SweetAlert2Module],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);
  cartService = inject(CartService);
  id: string = '';
  product: Product = {    
    codigo: '',
    descripcion: '',
    id: '',
    imagen: '',
    stock: '',
    precio: 0,
    tiendaId: 0
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getProductoById(this.id).subscribe({
        next: (product) => {
          this.product = product;
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
    });
  }

  agregarCarrito( product: Product) {
    let cartProduct = {
      id: product.id,
      codigo: product.codigo,
      descripcion: product.descripcion,
      precio: product.precio,
      imagen: product.imagen,
      stock: product.stock,
      tiendaId: product.tiendaId,
      quantity: 1
    };
    
    this.cartService.addToCart(cartProduct);
    Swal.fire({
      title: "Producto Agregado",
      text: "",
      icon: "success"
    });
  }
}
