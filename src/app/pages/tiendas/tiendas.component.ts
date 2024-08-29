import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from '@app/models/tienda';
import { TiendaService } from '@app/services/tienda.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [SweetAlert2Module],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css'
})
export class TiendasComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  tiendaService = inject(TiendaService);

  tiendas: Tienda[] = [];

  constructor(private location: Location) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.tiendaService.getAllTiendas().subscribe({
      next: tiendas => {
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
  }

  irTienda() {
    this.router.navigate(['/tienda', '' ]);
  }

  editar(tiendaId: string) {
    this.router.navigate(['/tienda', tiendaId ]);
  }

  eliminar(tiendaId: string) {
    Swal.fire({
      title: "¿Eliminar?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.tiendaService.deleteTienda(tiendaId).subscribe({
          next: () => {
            this.getAll();
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

  goBack() {
    this.router.navigate(['/']);
  }
}
