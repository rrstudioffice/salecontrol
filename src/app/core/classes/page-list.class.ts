import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

// ABSTRACT
export abstract class PageList<T extends any> {
  constructor(protected route: ActivatedRoute, public navCtrl: NavController) {}

  update(page: string, item: T) {
    this.navCtrl.navigateForward([`/${page}/edit`, item.id]);
  }

  view(page: string, item: T) {
    this.navCtrl.navigateForward([`/${page}/view`, item.id]);
  }
}
