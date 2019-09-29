import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { map, switchMap } from 'rxjs/operators';

import { UserService, IUser } from 'src/app/account/services/user.service';

export interface IType {
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
export class TypeService extends Firestore<IType> {
  constructor(protected db: AngularFirestore, private userService: UserService) {
    super(db);
    this.init();
  }

  private init() {
    this.setCollection(this.TYPES);
  }

  getAllWithRelations() {
    const constUser = this.getRelations(this.USERS);
    return this.userService.getBySession().pipe(
      switchMap(user =>
        this.db
          .collection<IType>(this.TYPES, ref => ref.where('createdBy', '==', user.id))
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
