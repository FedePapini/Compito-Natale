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
} from '@angular/fire/firestore';

export type UserRole = 'user' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Firestore);

  user$ = user(this.auth);

  async register(email: string, password: string, displayName: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(this.db, 'users', uid), {
      email,
      displayName,
      role: 'user',
      createdAt: serverTimestamp(),
    });

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
