import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';

import { AuthService } from 'src/app/core/services/auth.service';

export interface INotification {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends Firestore<INotification> {
  constructor(public db: AngularFirestore, private authService: AuthService) {
    super(db);
    this.init();
  }

  private init() {
    this.setCollection(`/notifications`);
  }
}
