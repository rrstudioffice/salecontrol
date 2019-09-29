import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';

export interface ISetting {
  id?: string;
  app: string;
  isVip?: boolean; // ON/OFF = VIP
  badgeMenuOnOff: boolean; // ON/OFF = QUANTIDADE DE ITEMS DO MENU
  battle: boolean; // ON/OFF = Batalha dos Goleiros
  checkout: boolean; // ON/OFF = Checkout dos goleiros, treinadores nos jogos e treinos
  game: boolean; // ON/OFF = Cartola do Sou Goleiro
  ranking: boolean; // ON/OFF = Liga e Desliga o Ranking
  carrer: any;
  auth: any;
  status?: boolean;
}
export interface IActiviyXp {
  id?: string;
  goalDone: number;
  goalTaken: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private itemsCollection: AngularFirestoreCollection<ISetting>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<ISetting>('settings');
  }

  getSystem() {
    return this.itemsCollection
      .doc<ISetting>('system')
      .snapshotChanges()
      .pipe(map(a => ({ id: a.payload.id, ...a.payload.data() })));
  }

  getCarrer() {
    return this.itemsCollection
      .doc<ISetting>('system')
      .snapshotChanges()
      .pipe(map(a => ({ ...a.payload.data().carrer })));
  }

  getAuth() {
    return this.itemsCollection
      .doc<ISetting>('system')
      .snapshotChanges()
      .pipe(map(a => ({ ...a.payload.data().auth })));
  }

  getValuesXp() {
    return this.itemsCollection
      .doc<IActiviyXp>('activityByXp')
      .snapshotChanges()
      .pipe(map(a => ({ id: a.payload.id, ...a.payload.data() })));
  }

  getGoalkeeper() {
    return this.itemsCollection
      .doc<ISetting>('goalkeeper')
      .snapshotChanges()
      .pipe(map(a => ({ id: a.payload.id, ...a.payload.data() })));
  }

  update(todo: any, id: string) {
    const constTodo = Object.assign({ ...todo, updatedAt: new Date().toISOString() });
    return this.itemsCollection.add(constTodo);
  }

  set(todo: ISetting, id: string) {
    return this.itemsCollection.doc(id).set(todo);
  }

  remove(id: string) {
    return this.itemsCollection.doc(id).delete();
  }
}
