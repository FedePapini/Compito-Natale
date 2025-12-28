import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  docData,
} from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';

export type UserRole = 'user' | 'admin';

export type UserProfile = {
  email: string;
  displayName: string;
  role: UserRole;
  createdAt?: any;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Firestore);

  // utente Auth (Firebase)
  user$ = user(this.auth);

  // profilo Firestore (users/{uid})
  profile$: Observable<UserProfile | null> = this.user$.pipe(
    switchMap(u => {
      if (!u) return of(null);
      return docData(doc(this.db, 'users', u.uid)) as Observable<UserProfile>;
    })
  );

  async register(email: string, password: string, displayName: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    // Prova a creare il profilo su Firestore, ma non bloccare la registrazione se fallisce
    try {
      await setDoc(doc(this.db, 'users', uid), {
        email,
        displayName,
        role: 'user',
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Firestore users/{uid} write failed:', e);
    }

    return cred.user;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async getRole(uid: string): Promise<UserRole> {
    const snap = await getDoc(doc(this.db, 'users', uid));
    return (snap.data()?.['role'] ?? 'user') as UserRole;
  }
}
