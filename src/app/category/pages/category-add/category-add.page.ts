import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PageAdd } from 'src/app/core/classes/page-add.class';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss']
})
export class CategoryAddPage extends PageAdd implements OnInit {
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
    private service: CategoryService,
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
      this.service.get(this.id).subscribe(snap => {
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
        this.service
          .update({ id: this.id, updatedBy: this.user.id, ...this.form.value })
          .then(() => {
            this.overlay.toast({
              message: 'Categoria alterada'
            });
          });
      } else {
        this.service.add({ createdBy: this.user.id, ...this.form.value }).then(() => {
          this.overlay.toast({
            message: 'Categoria adicionada'
          });
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.navCtrl.navigateBack(['/category']);
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
