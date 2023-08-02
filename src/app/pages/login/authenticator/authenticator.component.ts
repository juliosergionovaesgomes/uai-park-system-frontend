import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
type TLoginData = {
  id: number;
  img: string;
};

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent {
  @Input('loginData') loginData = {} as TLoginData;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
        this.authService.accessToken = res.refreshToken;
        AuthService.authEmitter.emit(true);
        this.router.navigate(['/']);
      },
    });
  }
}
