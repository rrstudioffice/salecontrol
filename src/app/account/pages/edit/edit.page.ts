import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  public form: FormGroup;
  user: any;

  constructor(
    public fb: FormBuilder,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: [true, Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.getBySession().subscribe(user => {
      this.user = user;
      this.form.patchValue(user);
    });
  }

  async save() {
    const loading = await this.overlayService.loading({ message: 'Editando ...' });
    try {
      this.userService.update({
        id: this.user.id,
        lastname: this.form.value.lastname,
        birthday: this.form.value.birthday,
        address: this.form.value.address,
        gender: this.form.value.gender,
        newUser: false
      });
      this.navCtrl.navigateRoot('/account');
      this.overlayService.toast({
        message: 'Sua conta foi alterada com sucesso!'
      });
    } catch (error) {
      this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
