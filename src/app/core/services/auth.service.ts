import { Injectable } from '@angular/core';
import { AuthUser, AuthProvider, AuthOptions } from './auth.types';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({ isSignin, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;
    if (provider !== AuthProvider.Email) {
      operation = this.siginWithPopup(provider);
    } else {
      operation = isSignin ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }
    return operation;
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  siginWithPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;
    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        signInProvider = new auth.GoogleAuthProvider();
        break;
      case AuthProvider.Github:
        signInProvider = new auth.GithubAuthProvider();
        break;
    }
    return this.afAuth.auth.signInWithPopup(signInProvider).then(credentials => {
      console.log(credentials);

      if (credentials.additionalUserInfo.isNewUser) {
        this.registerUser(credentials);
      }
      return credentials;
    });
  }

  private signInWithEmail({ email, password }: AuthUser): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({
    firstname,
    lastname,
    email,
    password
  }: AuthUser): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credentials => {
      const displayName = firstname + ' ' + lastname;
      this.db
        .collection('users')
        .doc(credentials.user.uid)
        .set({
          email,
          firstname,
          lastname,
          displayName,
          photoURL: null,
          createdAt: new Date().toISOString()
        });
      return credentials.user
        .updateProfile({ displayName: name, photoURL: null })
        .then(() => credentials);
    });
  }

  /** ADICIONA USUÁRIO AO BANCO DE DADOS ( FIRESTORE ) */
  private registerUser(credentials): void {
    const profile = credentials.additionalUserInfo.profile;
    let model: any;
    if (credentials.additionalUserInfo.providerId === 'google.com') {
      model = {
        email: profile.email,
        firstname: profile.given_name,
        lastname: profile.family_name,
        displayName: profile.name,
        photoURL: profile.picture
      };
    } else if (credentials.additionalUserInfo.providerId === 'facebook.com') {
      model = {
        email: profile.email,
        firstname: profile.first_name,
        lastname: profile.last_name,
        displayName: profile.name,
        photoURL: 'https://graph.facebook.com/' + profile.id + '/picture'
      };
    }
    this.db
      .collection('users')
      .doc(credentials.user.uid)
      .set(model);
  }
}
