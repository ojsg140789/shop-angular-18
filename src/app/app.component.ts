import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";

import { AuthService } from './services/auth.service';
import { UserInterface } from './models/user-interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);
  
  ngOnInit() {
    // this.authService.user$
    // .subscribe(
    //   ( user: any ) => {
    //     if(user) {
    //       this.authService.currentUserSignal.set({
    //         id: user.uid,
    //         username: user.displayName,
    //         email: user.email
    //       });
    //     }else {
    //       this.authService.currentUserSignal.set(null);
    //     }
    //   }
    // );
  }
}
