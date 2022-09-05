import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getUsers } from 'src/app/database/Users';
import { UserSingIn } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserAuthenticated: boolean = false;

  constructor(
    private router: Router,
  ) { }

  signIn(user: UserSingIn){
    const { email, password } = user;

    const users = getUsers();
    const hasUser = users.find(user => user.email === email && user.password === password)

    if(hasUser){
      this.isUserAuthenticated = true;

      const saveUser = {
        email,
        password,
        country: hasUser.country
      }

      localStorage.setItem('Netflix_user', JSON.stringify(saveUser));
      return;
    }

    this.isUserAuthenticated = false;
  }

  logout(){
    localStorage.removeItem('Netflix_user');
  }

  getUserAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
}
