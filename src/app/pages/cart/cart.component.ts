import { Component, inject } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import { CartItem } from '@app/models/cart-item';
import { CartService } from '@app/services/cart.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  router = inject(Router)
  cartService = inject(CartService);
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private location: Location) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getCartTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  goBack() {
    this.location.back();
  }

  comprar() {
    const user = localStorage.getItem('jwtToken');
    let compra = {
      clienteId: 0,
      detallesCompra: []
    }
    if(user) {
      let _user = JSON.parse(user);
      compra.clienteId = _user.id;
    }
    let items: any = [];
    this.cartItems.forEach(element => {
      let item = {
        "articuloId": element.id,
        "cantidad": element.quantity
      };
      items.push(item);
    });
    compra.detallesCompra = items;
    this.cartService.comprar(compra).subscribe({
      next: products => {
        Swal.fire({
          title: "Productos Comprados",
          text: "",
          icon: "success"
        });
        this.cartService.clearCart();
        this.router.navigate(['/']);
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
