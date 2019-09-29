import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Database } from './database.class';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> extends Database {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {
    super();
  }

  protected setCollection(path: string, queryfn?: QueryFn) {
    this.collection = path ? this.db.collection(path, queryfn) : null;
  }

  private setItem(item, operation: string): Promise<T> {
    return this.collection
      .doc<T>(item.id)
      [operation](item)
      .then(() => item);
  }

  addNewId(): string {
    return this.db.createId();
  }

  getAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(snaps => {
        return snaps.map(s => {
          const data = s.payload.doc.data() as object;
          return Object.assign({ id: s.payload.doc.id, ...data });
        });
      })
    );
  }

  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }

  set(item: T): Promise<T> {
    const todo = Object.assign({ ...(item as object), createdAt: new Date().toISOString() });
    return this.setItem(todo, 'set');
  }

  add(item: T): Promise<T> {
    item.id = this.db.createId();
    const todo = Object.assign({ ...(item as object), createdAt: new Date().toISOString() });
    return this.setItem(todo, 'set');
  }

  update(item: any): Promise<any> {
    const todo = Object.assign({ ...(item as object), updatedAt: new Date().toISOString() });
    return this.setItem(todo, 'update');
  }

  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }

  getRelations(collection: string) {
    const letObj: any = {};
    this.db
      .collection(collection)
      .snapshotChanges()
      .subscribe(snaps => {
        snaps.forEach(snap => {
          letObj[snap.payload.doc.id] = snap.payload.doc.data();
        });
      });
    return letObj;
  }
}
