import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsService } from '../services/events.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="event$ | async as event">
      <h1>{{ event.title }}</h1>
      <p>{{ event.date }} – {{ event.venue }}</p>
      <p>{{ event.description }}</p>

      <a routerLink="/events">← Torna indietro</a>
    </div>
  `
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(EventsService);

  event$ = this.route.paramMap.pipe(
    switchMap(params => this.service.getEventById(params.get('id')!))
  );
}
