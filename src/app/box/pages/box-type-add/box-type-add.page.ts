import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PageAdd } from 'src/app/core/classes/page-add.class';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-box-type-add',
  templateUrl: './box-type-add.page.html',
  styleUrls: ['./box-type-add.page.scss']
})
export class BoxTypeAddPage extends PageAdd implements OnInit {
  form: FormGroup;
  user: IUser;
  categoryTitle = '';
  categoryDescription = '';

  constructor(
    protected route: ActivatedRoute,
    private navCtrl: NavController,
    public translate: TranslateService,
    private fb: FormBuilder,
    private userService: UserService,
    private typeService: TypeService,
    private overlay: OverlayService
  ) {
    super(route);
  }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  private init() {
    this.userService.getBySession().subscribe(user => (this.user = user));
    if (this.id) {
      this.typeService.get(this.id).subscribe(snap => {
        this.form.patchValue(snap);
      });
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [false, Validators.required]
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
        this.typeService
          .update({ id: this.id, updatedBy: this.user.id, ...this.form.value })
          .then(() => {
            this.overlay.toast({
              message: 'Categoria alterada'
            });
          });
      } else {
        this.typeService.add({ createdBy: this.user.id, ...this.form.value }).then(() => {
          this.overlay.toast({
            message: 'Categoria adicionada'
          });
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.navCtrl.navigateBack(['/box/type']);
      loading.dismiss();
    }
  }

  renderCategory(event) {
    let title: string;
    let description: string;
    if (event.detail.value === 'pay') {
      title = 'Despesas';
      description = 'Conta de Luz, Conde de água, Recarga de Celular, Aluguel...';
    } else {
      title = 'Receitas';
      description = 'Mensalidade, Venda de Produtos, Salário...';
    }
    this.categoryTitle = title;
    this.categoryDescription = description;
  }
}
