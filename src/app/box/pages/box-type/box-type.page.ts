import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { IType, TypeService } from '../../services/type.service';

@Component({
  selector: 'app-box-type',
  templateUrl: './box-type.page.html',
  styleUrls: ['./box-type.page.scss'],
})
export class BoxTypePage implements OnInit {
  items$: Observable<IType[]>;
  user$: Observable<IUser>;
  category = 'receive';

  constructor(
    public plt: Platform,
    private navCtrl: NavController,
    private overlay: OverlayService,
    private userService: UserService,
    private typeService: TypeService
  ) {}

  ngOnInit() {
    this.items$ = this.typeService.getAllByCondition('receive');
    this.user$ = this.userService.getBySession();
  }
  async view(item) {
    await this.overlay.alert({
      header: 'Tipo',
      subHeader: item.name,
      message: 'Criado por: ' + item.user.displayName,
      buttons: ['Concluir']
    });
  }

  update(event) {
    this.navCtrl.navigateForward(['/type/edit', event.id]);
  }

  async delete(item: IType) {
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
            this.typeService.delete(item).then(() => {
              this.overlay.toast({
                message: 'Tipo excluído do histórico do sistema'
              });
            });
          }
        }
      ]
    });
  }

  segmentChanged(ev) {
    this.items$ = this.typeService.getAllByCondition(ev.detail.value);
  }

}
