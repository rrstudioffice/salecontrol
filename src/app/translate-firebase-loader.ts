import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

export class TranslateFirebaseLoader implements TranslateLoader {
  constructor(public db: AngularFirestore) {}
  /** Gets the translations from firebase */
  public getTranslation(lang: string): any {
    return this.db
      .doc('/translate/' + lang)
      .snapshotChanges()
      .pipe(
        map(data => ({
          ...data.payload.data()
        }))
      );
  }
}
