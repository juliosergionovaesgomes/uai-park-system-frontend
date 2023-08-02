import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output('onLogin') onLogin = new EventEmitter();
  form!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.authService
        .googleLogin({
          token: user.idToken,
        })
        .subscribe({
          next: (res) => {
            this.authService.accessToken = res.refreshToken;
            AuthService.authEmitter.emit(true);
            this.router.navigate(['/']);
          },
        });
    });
  }

  onSubmit() {
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res) => this.onLogin.emit(res),
    });
  }
}
