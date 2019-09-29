import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { switchMap, map } from 'rxjs/operators';

export interface IUser {
  id: string;
  email: string;
  photoURL?: string;
  displayName: string;
  firstname?: string;
  lastname?: string;
  gender?: boolean;
  birthday?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UserService extends Firestore<IUser> {

  constructor(public db: AngularFirestore, private authService: AuthService) {
    super(db);
    this.init();
  }

  private init() {
    this.setCollection(`/users`);
  }

  getBySession(): Observable<IUser> {
    return this.authService.authState$.pipe(
      switchMap(user => {
        if (user) {
          return this.getOne(user.uid);
        }
      })
    );
  }

  getOne(id: string) {
    return this.collection
      .doc<IUser>(id)
      .snapshotChanges()
      .pipe(
        map(a => ({
          id: a.payload.id,
          ...a.payload.data()
        }))
      );
  }

  getUserByEmail(value) {
    return this.db
      .collection<IUser>('users', ref => ref.where('email', '==', value).limit(1))
      .valueChanges();
  }
}
