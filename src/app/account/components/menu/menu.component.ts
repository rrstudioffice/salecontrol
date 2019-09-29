import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: { title: string; url: string; icon: string }[];

  constructor(
    private navCrtl: NavController,
    private authService: AuthService,
    private overlayService: OverlayService,
    private popoverCrtl: PopoverController
  ) {}

  ngOnInit() {
    this.menu = [
      { title: 'Editar conta', url: '/account/edit', icon: 'create' },
      { title: 'Notificações', url: '/account/notifications', icon: 'notifications' }
    ];
  }

  goPage(url: string): void {
    this.popoverCrtl.dismiss();
    this.navCrtl.navigateForward([url]);
  }

  logout(): Promise<void> {
    return this.authService.logout().then(() => {
      this.navCrtl.navigateRoot(['/auth']).then(() => {
        window.location.reload();
        this.overlayService.toast({ message: 'Sessão desconectada' });
      });
    });
  }
}
