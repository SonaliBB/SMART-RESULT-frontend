import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private validCredentials = { username: 'adminlog', password: 'admin1234' };
  private isLoggedIn = false;

  authenticate(username: string, password: string): boolean {
    if (
      username === this.validCredentials.username &&
      password === this.validCredentials.password
    ) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
