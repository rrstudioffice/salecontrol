import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit {
  status: string;
  items: any;

  constructor(private service: NotificationService, private overlayService: OverlayService) {}

  ngOnInit() {
    this.items = this.service.getAll();
    this.status = 'active';
  }

  async remove(item: any) {
    const alert = await this.overlayService.alert({
      header: 'Confirmar!',
      message: 'Tem certeza de que deseja excluir?',
      buttons: [
        'Cancelar',
        {
          text: 'Ok',
          handler: () => {
            this.service.delete(item).then(() => {
              this.overlayService.toast({
                message: 'Notificação excluída...'
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
