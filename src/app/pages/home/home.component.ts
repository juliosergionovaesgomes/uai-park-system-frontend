import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res) => {
        this.message = 'Hi' + ' ' + res.first_name;
        AuthService.authEmitter.emit(true);
      },
      error: (err) => {
        this.message = 'You are not authenticate';
        AuthService.authEmitter.emit(false);
      },
    });
  }
}
