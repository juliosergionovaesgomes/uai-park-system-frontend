import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotService } from 'src/app/services/forgot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ForgotService],
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form!: FormGroup;
  cls = '';
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private forgotService: ForgotService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
    });
  }

  onSubmit() {
    this.forgotService.forgot(this.form.getRawValue()).subscribe({
      next: () => {
        this.cls = 'success';
        this.message = 'Email was sent!';
        // this.router.navigate(['/login']);
      },
      error: () => {
        this.cls = 'danger';
        this.message = 'Error ocurred!';
      },
    });
  }
}
