import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SiginComponent implements OnInit {

  signInForm: FormGroup = new FormGroup({});
  isUserNotAuthenticated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signInSubmit(){
    if(this.signInForm.valid){
      const user = this.signInForm.value;

      this.authService.signIn(user);
      this.isUserNotAuthenticated = !this.authService.getUserAuthenticated();
      this.router.navigate(['/']);
      return;
    }

    this.isUserNotAuthenticated = true;
  }
}
