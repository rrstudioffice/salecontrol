import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';

import { UserService, IUser } from 'src/app/account/services/user.service';

export interface IMethod {
  id: string;
  name: string;
  type: string;
  createdBy: string;
  updatedBy?: string;
  user?: IUser;
}
@Injectable({
  providedIn: 'root'
})
export class MethodService extends Firestore<IMethod> {
  constructor(protected db: AngularFirestore, private userService: UserService) {
    super(db);
    this.init();
  }

  private init() {
    this.setCollection(this.METHODS);
  }

  getAllWithRelations() {
    const constUser = this.getRelations(this.USERS);
    return this.userService.getBySession().pipe(
      switchMap(user =>
        this.db
          .collection<IMethod>(this.METHODS, ref => ref.where('createdBy', '==', user.id))
          .snapshotChanges()
          .pipe(
            map(snaps => {
              return snaps.map(s => {
                const data = s.payload.doc.data();
                return {
                  id: s.payload.doc.id,
                  user: constUser[data.createdBy],
                  ...data
                };
              });
            })
          )
      )
    );
  }

  getAllByCondition(type: string) {
    return this.getAllWithRelations().pipe(
      map(snaps => {
        return snaps.filter(s => s.type === type);
      })
    );
  }
}
