import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authenticate: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    AuthService.authEmitter.subscribe((authenticated) => {
      this.authenticate = authenticated;
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.accessToken = '';
        AuthService.authEmitter.emit(false);
      },
      error: (err) => {
        this.authenticate = false;
      },
    });
  }
}
