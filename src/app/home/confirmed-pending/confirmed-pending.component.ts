import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmed-pending',
  templateUrl: './confirmed-pending.component.html',
  styleUrls: ['./confirmed-pending.component.scss']
})
export class ConfirmedPendingComponent implements OnInit {
  @Input() cardTitle: string;
  @Input() confirmed: number;
  @Input() pending: number;

  constructor() {}

  ngOnInit() {}
}
