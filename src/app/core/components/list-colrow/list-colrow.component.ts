import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-list-colrow',
  templateUrl: './list-colrow.component.html',
  styleUrls: ['./list-colrow.component.scss']
})
export class ListColrowComponent implements OnInit {
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() upload = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() menu = new EventEmitter<any>();
  @Input() menuIcon = 'assets/icons/menu.svg';
  @Input() isUpdate = true;
  @Input() isUpload = true;
  @Input() isDelete = true;
  @Input() isMenu = true;
  @Input() item: any;

  constructor(public plt: Platform) {}

  ngOnInit() {}
}
