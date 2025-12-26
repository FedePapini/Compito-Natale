import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div style="max-width:720px;margin:40px auto;padding:20px">
    <h1>DC10 - App</h1>

    <p>Se vedi questa pagina, sei loggato ✅</p>

    <p>
      <a routerLink="/admin">Vai ad Admin</a> (solo se sei admin)
    </p>

    <button (click)="logout()">Logout</button>
  </div>
  `
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
