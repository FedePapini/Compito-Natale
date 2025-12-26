import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div style="max-width:720px;margin:40px auto;padding:20px">
      <h2>Admin</h2>
      <p>Se vedi questa pagina, sei admin ✅</p>
    </div>
  `
})
export class AdminComponent {}
