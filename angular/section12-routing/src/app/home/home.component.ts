import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLogin() {
    this.authService.logIn();
  }

  onLogout() {
    this.authService.logout();
  }
}
