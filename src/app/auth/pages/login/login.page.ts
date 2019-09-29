import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Abrir uma conta'
  };

  private firstnameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private lastnameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthService,
    private fb: FormBuilder,
    private overlay: OverlayService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.form.get('lastname') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Efetuar login' : 'Registrar';
    this.configs.actionChange = isSignIn ? 'Abrir conta' : 'Já tenho uma conta';
    !isSignIn
      ? this.form.addControl('firstname', this.firstnameControl)
      : this.form.removeControl('firstname');
    !isSignIn
      ? this.form.addControl('lastname', this.lastnameControl)
      : this.form.removeControl('lastname');
  }

  async save(provider: AuthProvider): Promise<void> {
    const loading = await this.overlay.loading();
    try {
      await this.authService.authenticate({
        isSignin: this.configs.isSignIn,
        user: this.form.value,
        provider
      });
      this.navCtrl.navigateRoot(this.route.snapshot.queryParamMap.get('redirect') || '/');
    } catch (e) {
      await this.overlay.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
