import { Component, inject } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import { CartItem } from '@app/models/cart-item';
import { CartService } from '@app/services/cart.service';
import { Router } from '@angular/router';

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
}
