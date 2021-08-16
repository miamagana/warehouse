import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() cart!: Record<string, number>;
  @Output() addProduct: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeProduct: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  addProductToCart(): void {
    this.addProduct.emit(this.product._id);
  }

  removeProductFromCart(): void {
    this.removeProduct.emit(this.product._id);
  }
}
