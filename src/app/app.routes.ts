import { Routes } from '@angular/router';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => 
            import('./auth/login/login.component')
                .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => 
            import('./auth/register/register.component')
                .then(m => m.RegisterComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => 
            import('./pages/dashboard/dashboard.component')
                .then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'detail/:id',
        loadComponent: () => 
            import('./pages/product-detail/product-detail.component')
                .then(m => m.ProductDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        loadComponent: () => 
            import('./pages/cart/cart.component')
                .then(m => m.CartComponent),
        canActivate: [authGuard]                
    },
    {
        path: 'tiendas',
        loadComponent: () => 
            import('./pages/tiendas/tiendas.component')
                .then(m => m.TiendasComponent),
        canActivate: [authGuard]                
    },
    {
        path: 'tienda/:id',
        loadComponent: () => 
            import('./pages/tienda/tienda.component')
                .then(m => m.TiendaComponent),
        canActivate: [authGuard]                
    },
    {
        path: 'producto/:id',
        loadComponent: () => 
            import('./pages/producto/producto.component')
                .then(m => m.ProductoComponent),
        canActivate: [authGuard]                
    },
    {
        path: 'cliente/:id',
        loadComponent: () => 
            import('./pages/cliente/cliente.component')
                .then(m => m.ClienteComponent),
        canActivate: [authGuard]                
    },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: NoPageFoundComponent }
];
