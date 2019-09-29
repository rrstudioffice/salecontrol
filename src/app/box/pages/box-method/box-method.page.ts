import { Component, OnInit } from '@angular/core';
import { Platform, NavController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { MethodService, IMethod } from '../../services/method.service';

@Component({
  selector: 'app-box-method',
  templateUrl: './box-method.page.html',
  styleUrls: ['./box-method.page.scss']
})
export class BoxMethodPage implements OnInit {
  items$: Observable<IMethod[]>;
  user$: Observable<IUser>;
  method: 'receive';

  constructor(
    public plt: Platform,
    private navCtrl: NavController,
    private overlay: OverlayService,
    private modalCtrl: ModalController,
    private userService: UserService,
    private service: MethodService
  ) {}

  ngOnInit() {
    this.items$ = this.service.getAllByCondition('receive');
    this.user$ = this.userService.getBySession();
  }
  async view(item) {
    await this.overlay.alert({
      header: 'Método',
      subHeader: item.name,
      message: 'Criado por: ' + item.user.displayName,
      buttons: ['Concluir']
    });
  }

  update(event) {
    this.navCtrl.navigateForward(['/category/edit', event.id]);
  }

  async delete(item: IMethod) {
    await this.overlay.alert({
      header: 'Confirmar!',
      message: 'Tem certeza de que deseja deletar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: () => {
            this.service.delete(item).then(() => {
              this.overlay.toast({
                message: 'Método excluído do histórico do sistema'
              });
            });
          }
        }
      ]
    });
  }

  segmentChanged(ev) {
    this.items$ = this.service.getAllByCondition(ev.detail.value);
  }
}
