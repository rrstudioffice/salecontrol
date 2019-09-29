export enum AuthProvider {
  Email,
  Facebook,
  Google,
  Github
}

export interface AuthUser {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
}

export interface AuthOptions {
  isSignin: boolean;
  provider: AuthProvider;
  user: AuthUser;
}
