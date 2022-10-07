import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SiginComponent } from './signin.component';

describe('SiginComponent', () => {
  let component: SiginComponent;
  let fixture: ComponentFixture<SiginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiginComponent],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) signInSubmit -> Should not authenticate user', () => {
    component.createSignInForm();
    component.signInSubmit();

    expect(component.isUserNotAuthenticated).toBeTrue();
  });

  it('(U) signInSubmit -> Should authenticate user', () => {
    const spySignIn = spyOn(authService, 'signIn');
    const spyGetUserAuthenticated = spyOn(authService, 'getUserAuthenticated')
      .and.returnValue(true);
    const spyRouter = spyOn(router, 'navigate');

    component.createSignInForm();
    component.signInForm.controls['email'].setValue('user1@teste.com');
    component.signInForm.controls['password'].setValue('teste1');

    component.signInSubmit();

    expect(spySignIn).toHaveBeenCalled();
    expect(component.isUserNotAuthenticated).toEqual(!spyGetUserAuthenticated);
    expect(spyRouter).toHaveBeenCalledWith(['/']);
  });
});
