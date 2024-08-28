import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CartService } from '@app/services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);

  itemCount: number = 0;

  faUser = faUser;
  faCartShopping = faCartShopping

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.itemCount = count;
    });
  }

  logout() {
    //this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
