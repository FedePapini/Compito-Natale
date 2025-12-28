import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface EventItem {
  id?: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  published: boolean;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private db = inject(Firestore);

  getEvents(): Observable<EventItem[]> {
    const ref = collection(this.db, 'events');
    const q = query(ref, where('published', '==', true), orderBy('date'));
    return collectionData(q, { idField: 'id' }) as Observable<EventItem[]>;
  }

  getEventById(id: string): Observable<EventItem> {
    const ref = doc(this.db, `events/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<EventItem>;
  }
}
