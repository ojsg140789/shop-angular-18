import { Injectable } from '@angular/core';
import { CartItem } from '@app/models/cart-item';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartItemCount(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  getCartTotalPrice(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((acc, item) => acc + item.precio * item.quantity, 0))
    );
  }

  addToCart(item: any): void {
    const currentCart = this.cartSubject.value;
    const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex !== -1) {
      currentCart[itemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cartSubject.next([...currentCart]);
  }

  removeFromCart(itemR: any): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== itemR.id);
    this.cartSubject.next([...updatedCart]);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }
}
