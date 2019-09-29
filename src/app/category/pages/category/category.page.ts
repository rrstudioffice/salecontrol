import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CategoryService, ICategory } from '../../services/category.service';
import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss']
})
export class CategoryPage implements OnInit {
  items$: Observable<ICategory[]>;
  user$: Observable<IUser>;
  category = 'receive';

  constructor(
    public plt: Platform,
    private navCtrl: NavController,
    private overlay: OverlayService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.items$ = this.categoryService.getAllByCondition('receive');
    this.user$ = this.userService.getBySession();
  }
  async view(item) {
    await this.overlay.alert({
      header: 'Categoria',
      subHeader: item.name,
      message: 'Criado por: ' + item.user.displayName,
      buttons: ['Concluir']
    });
  }

  update(event) {
    this.navCtrl.navigateForward(['/category/edit', event.id]);
  }

  async delete(item: ICategory) {
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
            this.categoryService.delete(item).then(() => {
              this.overlay.toast({
                message: 'Categoria excluída do histórico do sistema'
              });
            });
          }
        }
      ]
    });
  }

  segmentChanged(ev) {
    this.items$ = this.categoryService.getAllByCondition(ev.detail.value);
  }
}
