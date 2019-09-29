import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-null',
  templateUrl: './list-null.component.html',
  styleUrls: ['./list-null.component.scss']
})
export class ListNullComponent {
  @Input() title = 'Nenhum resultado até o momento...' as string;
  @Input() icon = 'assets/icons/empty.svg' as string;
  constructor() {}
}
