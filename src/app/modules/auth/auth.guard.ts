import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getUsers } from 'src/app/tests/mocks/Users';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate()
    {

      const users = getUsers();
      const hasUserInLocalStorage = JSON.parse(localStorage.getItem('Netflix_user') as string);

      if(hasUserInLocalStorage){
        const { email, password} = hasUserInLocalStorage;
        const hasUser = users.find(user => user.email === email && user.password === password);

        if(hasUser){
          return true;
        }

        return false;
      }

      if(this.authService.getUserAuthenticated()){
        return true;
      }

      this.router.navigate(['/signin']);
      return false;
  }

}
