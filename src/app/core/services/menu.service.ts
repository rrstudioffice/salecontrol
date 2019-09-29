import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
// SERVICE
import { CategoryService } from 'src/app/category/services/category.service';
import { BoxService } from 'src/app/box/services/box.service';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private boxService: BoxService,
    private categoryService: CategoryService,
    private settingService: SettingService
  ) {}

  /**
   * QUANTIDADE DE ITEMS DO MENU, PODE SER DESLIGADO PELO ADMIN
   * badgeMenuOnOff : boolean
   */
  renderMenu() {
    return [
      {
        title: 'CONTROLE DE CAIXA',
        color: 'light',
        open: false,
        pages: this.renderBoxPages()
      },
      {
        title: 'CONFIGURAÇÕES',
        color: 'light',
        open: false,
        pages: this.renderSettingsPages()
      }
    ];
  }

  /**
   * C A M P E O N A T O
   */
  renderBoxPages() {
    return combineLatest([
      // COMPETIÇÕES
      this.settingService.getSystem().pipe(
        switchMap(menu => {
          return this.boxService.getAll().pipe(
            map(r => ({
              title: 'Controle',
              icon: 'cash-register',
              url: '/box',
              hidden: false,
              badge: menu.badgeMenuOnOff ? r.length || 0 : 0
            }))
          );
        })
      ),
      // CONTAS A PAGAR
      this.settingService.getSystem().pipe(
        switchMap(menu => {
          return this.boxService.getAll().pipe(
            map(r => ({
              title: 'Conta a Pagar',
              icon: 'box-pay',
              url: '/box/add/pay',
              hidden: false,
              badge: menu.badgeMenuOnOff ? r.length || 0 : 0
            }))
          );
        })
      ),
      // CONTAS A RECEBER
      this.settingService.getSystem().pipe(
        switchMap(menu => {
          return this.boxService.getAll().pipe(
            map(r => ({
              title: 'Conta a Receber',
              icon: 'box-receive',
              url: '/box/add/receive',
              hidden: false,
              badge: menu.badgeMenuOnOff ? r.length || 0 : 0
            }))
          );
        })
      )
    ]);
  }

  /**
   * G E R A L
   */
  private renderSettingsPages() {
    return combineLatest([
      // CATEGORIAS
      this.settingService.getSystem().pipe(
        switchMap(menu => {
          return this.categoryService.getAll().pipe(
            map(r => ({
              title: 'Tipos',
              icon: 'category',
              url: '/box/type',
              hidden: false,
              badge: menu.badgeMenuOnOff ? r.length || 0 : 0
            }))
          );
        })
      ),
      // MÉTODOS DE PAGAMENTO
      this.settingService.getSystem().pipe(
        switchMap(menu => {
          return this.categoryService.getAll().pipe(
            map(r => ({
              title: 'Métodos',
              icon: 'method',
              url: '/box/method',
              hidden: false,
              badge: menu.badgeMenuOnOff ? r.length || 0 : 0
            }))
          );
        })
      )
    ]);
  }
}
