import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterModel } from '../models/filter.model';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { IBox, BoxService } from '../../services/box.service';
import { QueryFn } from '@angular/fire/firestore';

@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss']
})
export class BoxPage implements OnInit {
  days: { cod: number; label: string }[];
  modelSearch: boolean;
  segmentBox: 'all';

  years: number[];

  items$: Observable<IBox[]>;
  form: FormGroup;

  modelFilter = new FilterModel(moment().month(), moment().year());

  date: string;
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlay: OverlayService,
    private boxService: BoxService
  ) {}

  ngOnInit() {
    this.init();
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      month: [moment().month()],
      year: [moment().year()]
    });
  }

  private init() {
    this.date = moment().format('MMMM YYYY');
    this.items$ = this.boxService.getAllByDate(this.modelFilter.month, this.modelFilter.year);
    this.days = [
      { cod: 0, label: 'Janeiro' },
      { cod: 1, label: 'Fevereiro' },
      { cod: 2, label: 'Março' },
      { cod: 3, label: 'Abril' },
      { cod: 4, label: 'Maio' },
      { cod: 5, label: 'Junho' },
      { cod: 6, label: 'Julho' },
      { cod: 7, label: 'Agosto' },
      { cod: 8, label: 'Setembro' },
      { cod: 9, label: 'Outubro' },
      { cod: 10, label: 'Novembro' },
      { cod: 11, label: 'Dezembro' }
    ];
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(moment().year() + 1 - i);
    }
    this.years = array;
  }

  view() {}

  update(event) {
    this.navCtrl.navigateForward(['/box/edit', event.methodId, event.id]);
  }

  async delete(item: IBox) {
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
            this.boxService.delete(item).then(() => {
              this.overlay.toast({
                message: 'Conta excluída do seu histórico...'
              });
            });
          }
        }
      ]
    });
  }

  search() {
    this.modelFilter.month = this.form.value.month;
    this.modelFilter.year = this.form.value.year;
    this.date = this.modelFilter.getMonthString();
    this.items$ = this.boxService.getAllByDate(this.form.value.month, this.form.value.year);
  }
  segmentChanged(event) {
    if (event.detail.value === 'receive') {
      this.items$ = this.boxService.getAllByDate(this.modelFilter.month, this.modelFilter.year, ref => ref.where('condition', '==', true));
    } else if (event.detail.value === 'pay') {
      this.items$ = this.boxService.getAllByDate(this.modelFilter.month, this.modelFilter.year, ref => ref.where('condition', '==', false));
    } else {
      this.items$ = this.boxService.getAllByDate(this.modelFilter.month, this.modelFilter.year);
    }
  }
}
