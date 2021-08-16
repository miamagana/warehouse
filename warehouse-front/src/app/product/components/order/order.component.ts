import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  @Output() order: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  orderCart(): void {
    this.order.emit();
  }
}
