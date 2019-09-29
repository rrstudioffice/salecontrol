import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

// ABSTRACT
export abstract class PageAdd {
  pageTitle: string;
  id: string;
  constructor(protected route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.id ? 'Alterar' : 'Adicionar';
  }
}
