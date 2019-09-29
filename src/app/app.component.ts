import { Component, NgZone, ApplicationRef } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './account/services/user.service';
import { Platform, MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { MenuService } from './core/services/menu.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public applicationRef: ApplicationRef;
  connectedToInternet: boolean;
  isOnline: boolean;
  message;

  selectedPath: string;
  shownGroup = 0;
  pages: any;
  model: any;

  constructor(
    private plt: Platform,
    private splashScreen: SplashScreen,
    private userService: UserService,
    private sidebar: MenuService,
    private menuCtrl: MenuController,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.router.events.pipe(filter(e => e instanceof RouterEvent)).subscribe((e: RouterEvent) => {
      this.selectedPath = e.url;
    });
  }

  initializeApp() {
    this.authService.isAuthenticated.subscribe(auth => {
      if (auth) {
        this.menuCtrl.enable(true, 'main');
        this.model = this.userService.getBySession();
        this.pages = this.sidebar.renderMenu();
      }
    });

    this.plt.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      moment.locale('pt-BR');
    });
  }

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  goPage(url: string) {
    this.navigate([url]);
    this.menuCtrl.close();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }
}
