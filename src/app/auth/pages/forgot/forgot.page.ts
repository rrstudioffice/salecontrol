import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss']
})
export class ForgotPage implements OnInit {
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private overlayService: OverlayService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  save() {
    this.authService.resetPassword(this.form.value.email).then(() => {
      this.overlayService.toast({
        message: 'Procedimento de recuperação de senha enviado para o seu E-mail'
      });
      this.navCtrl.navigateBack(['/login']);
    });
  }
}
