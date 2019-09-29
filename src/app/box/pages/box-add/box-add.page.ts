import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PageAdd } from 'src/app/core/classes/page-add.class';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UserService, IUser } from 'src/app/account/services/user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { IMethod, MethodService } from '../../services/method.service';
import { IType, TypeService } from '../../services/type.service';
import { BoxService } from '../../services/box.service';

@Component({
  selector: 'app-box-add',
  templateUrl: './box-add.page.html',
  styleUrls: ['./box-add.page.scss']
})
export class BoxAddPage extends PageAdd implements OnInit {
  types$: Observable<IType[]>;
  methods$: Observable<IMethod[]>;
  pageSubtitle: string;
  form: FormGroup;
  user: IUser;
  style: string;
  constCod: string;

  constructor(
    protected route: ActivatedRoute,
    private navCtrl: NavController,
    public translate: TranslateService,
    private fb: FormBuilder,
    private service: BoxService,
    private userService: UserService,
    private overlay: OverlayService,
    private typeService: TypeService,
    private methodService: MethodService
  ) {
    super(route);
  }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  private init() {
    this.constCod = this.route.snapshot.paramMap.get('cod');
    this.pageSubtitle = this.constCod === 'pay' ? 'Conta a Pagar' : 'Conta a Receber';
    this.style = this.constCod === 'pay' ? 'red' : 'green';
    this.types$ = this.typeService.getAllByCondition(this.constCod);
    this.methods$ = this.methodService.getAllByCondition(this.constCod);
    this.userService.getBySession().subscribe(user => (this.user = user));
    this.form.get('condition').setValue(this.constCod === 'receive');
    if (this.id) {
      this.service.get(this.id).subscribe(snap => {
        this.form.patchValue(snap);
      });
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      typeId: ['', Validators.required],
      methodId: ['', Validators.required],
      price: [null, Validators.required],
      datetime: ['', Validators.required],
      confirmed: [false],
      status: [false],
      condition: [false],
      description: ['']
    });
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
  get method(): FormControl {
    return this.form.get('method') as FormControl;
  }
  get price(): FormControl {
    return this.form.get('price') as FormControl;
  }
  get day(): FormControl {
    return this.form.get('day') as FormControl;
  }
  get month(): FormControl {
    return this.form.get('month') as FormControl;
  }
  get year(): FormControl {
    return this.form.get('year') as FormControl;
  }

  async save() {
    const loading = await this.overlay.loading({
      message: 'Salvando...'
    });
    try {
      if (this.id) {
        this.service.update({ id: this.id, ...this.form.value }).then(() => {
          this.overlay.toast({
            message: 'Conta a Pagar alterada'
          });
        });
      } else {
        this.service.add({ userId: this.user.id, ...this.form.value }).then(() => {
          this.overlay.toast({
            message: 'Conta a Pagar adicionada'
          });
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.navCtrl.navigateBack(['/box']);
      loading.dismiss();
    }
  }
}
