import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div style="max-width:900px;margin:40px auto;padding:20px">
    <h1>Area Utente</h1>

    <p>Se vedi questa pagina, sei loggato correttamente.</p>

    <div style="margin-top:20px">
      <a routerLink="/events">Vai agli eventi</a>
    </div>

    <button style="margin-top:20px" (click)="logout()">Logout</button>

    <p *ngIf="error" style="color:red;margin-top:12px">{{ error }}</p>
  </div>
  `
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';

  async logout() {
    this.error = '';
    try {
      await this.auth.logout();
      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error = e?.message ?? 'Errore logout';
    }
  }
}
