import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  GoogleLoginProvider,
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment.development';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TokenState } from 'src/app/store/token/token.reducer';
import { setToken } from 'src/app/store/token/token.actions';
import { setUser } from 'src/app/store/user/user.actions';
import { User } from 'src/app/types/user';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { InputFieldType } from 'src/app/@shared/input/input.component';

interface Model {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    RouterModule,
  ],
  providers: [
    AuthService,
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
      },
    },
    GoogleSigninButtonDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormComponent {
  @Output('onLogin') onLogin = new EventEmitter();
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private store: Store<TokenState>
  ) {}
  form = new FormGroup({});
  model: Model = { email: '', password: '' };

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        required: true,
      },
    },
  ];
  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   email: '',
    //   password: '',
    // });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.authService
        .googleLogin({
          token: user.idToken,
        })
        .subscribe({
          next: (res) => {
            this.store.dispatch(setToken(res.token));
            // this.authService.accessToken = res.token;
            AuthService.authEmitter.emit(true);
            this.router.navigate(['/']);
          },
        });
    });
  }

  onSubmit(model: Model) {
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res: User) => {
        this.onLogin.emit(res);
      },
    });
  }
}
