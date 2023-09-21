import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotService } from 'src/app/services/forgot.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ForgotService],
})
export class ResetComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private resetService: ForgotService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: '',
      password_confirm: '',
    });
  }

  onSubmit() {
    const formData = this.form.getRawValue();

    const data = {
      ...formData,
      token: this.route.snapshot.params['token'],
    };

    this.resetService.reset(data).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
    });
  }
}
