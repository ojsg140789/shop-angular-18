import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Product } from '@app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  router = inject(Router);
  @Input() item!: Product;
  faStar = faStar;

  detalle(id: string) {
    this.router.navigate(['/detail', id ]);
  }
}
