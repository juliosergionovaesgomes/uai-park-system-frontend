import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { setToken } from 'src/app/store/token/token.actions';
import { TokenState } from 'src/app/store/token/token.reducer';
type TLoginData = {
  id: number;
  img: string;
};

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthenticatorComponent {
  @Input('loginData') loginData = {} as TLoginData;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<TokenState>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: '',
    });
  }

  onSubmit() {
    const formData = this.form.getRawValue();
    const data = this.loginData;

    this.authService.authenticatorLogin({ ...data, ...formData }).subscribe({
      next: (res) => {
        this.store.dispatch(setToken(res.refreshToken));
        AuthService.authEmitter.emit(true);
        this.router.navigate(['/']);
      },
    });
  }
}
