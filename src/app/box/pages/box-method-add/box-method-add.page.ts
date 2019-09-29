import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PageAdd } from 'src/app/core/classes/page-add.class';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { MethodService } from '../../services/method.service';

@Component({
  selector: 'app-box-method-add',
  templateUrl: './box-method-add.page.html',
  styleUrls: ['./box-method-add.page.scss']
})
export class BoxMethodAddPage extends PageAdd implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  categoryDescription = '';
  categoryTitle = '';
  form: FormGroup;
  user: IUser;

  constructor(
    protected route: ActivatedRoute,
    private navCtrl: NavController,
    public translate: TranslateService,
    private fb: FormBuilder,
    private userService: UserService,
    private service: MethodService,
    private overlay: OverlayService
  ) {
    super(route);
  }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private init() {
    this.userService
      .getBySession()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => (this.user = user));
    if (this.id) {
      this.service
        .get(this.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(snap => {
          this.form.patchValue(snap);
        });
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['receive', Validators.required]
    });
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  async save() {
    const loading = await this.overlay.loading({
      message: 'Salvando...'
    });
    try {
      if (this.id) {
        this.service
          .update({ id: this.id, updatedBy: this.user.id, ...this.form.value })
          .then(() => {
            this.overlay.toast({
              message: 'Método alterado'
            });
          });
      } else {
        this.service.add({ createdBy: this.user.id, ...this.form.value }).then(() => {
          this.overlay.toast({
            message: 'Método adicionado'
          });
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.navCtrl.navigateBack(['/box/method']);
      loading.dismiss();
    }
  }
  renderCategory(event) {
    let title: string;
    let description: string;
    if (event.detail.value === 'pay') {
      title = 'Despesas';
      description =
        'Cartão de Crédito, Cartão de Débito, Débito em conta, Transferência bancária...';
    } else {
      title = 'Receitas';
      description =
        'Cartão de Crédito, Cartão de Débito, Débito em conta, Transferência bancária...';
    }
    this.categoryTitle = title;
    this.categoryDescription = description;
  }
}
