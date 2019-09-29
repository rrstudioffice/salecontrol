import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { MenuComponent } from '../../components/menu/menu.component';
import { ImagePage } from 'src/app/image/image.page';
import { Observable } from 'rxjs';

import { UserService, IUser } from '../../services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit {
  model$: Observable<IUser>;

  constructor(
    private userService: UserService,
    private popover: PopoverController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.model$ = this.userService.getBySession();
  }

  async open(ev: any) {
    const modal = await this.popover.create({
      component: MenuComponent,
      event: ev
    });
    modal.present();
  }

  async upload(model: IUser) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      // Passar sempre IMAGEM e URL
      componentProps: { image: model.photoURL || null, url: '/users/' + model.id }
    });
    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        // ATUALIZA A IMAGEM BD
        this.userService.update({ id: model.id, photoURL: result.data });
      }
    });
    modal.present();
  }
}
