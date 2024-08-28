import { inject, Injectable, signal } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { UserInterface } from '@app/models/user-interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //firebaeAuth = inject(Auth);
  //user$ = user(this.firebaeAuth);
  user$ = sessionStorage.getItem('__user');
  currentUserSignal = signal<UserInterface | null | undefined >(undefined);
  
  private user = signal<UserInterface | null>(null);

  // register(username: string, email: string, password: string): Observable<void> {
  //   const promise = createUserWithEmailAndPassword(this.firebaeAuth, email, password)
  //     .then(response => updateProfile(response.user, { displayName: username }));
  //   return from(promise);
  // }

  // login( email: string, password: string ): Observable<void> {
  //   const promise = signInWithEmailAndPassword( this.firebaeAuth, email, password)
  //     .then(() => {});
  //   return from(promise);
  // }

  // logout(): Observable<void> {
  //   const promise = signOut(this.firebaeAuth).then(() => {
  //     this.user.set(null);
  //   });
  //   return from(promise);
  // }

  isLoggedIn() {
    return this.user() !== null;
  }

  getUser() {
    return this.user();
  }

  // public onAuthStateChanged(callback: (user: any | null) => void) {
  //   return onAuthStateChanged(this.firebaeAuth, callback);
  // }
}
