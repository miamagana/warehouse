import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductState } from '../../store/reducers';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.models';
import * as ProductActions from '../../store/actions';
import * as ProductSelectors from '../../store/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = this.store.pipe(
    select(ProductSelectors.selectAllProducts)
  );
  cart$: Observable<Record<string, number>> = this.store.pipe(
    select(ProductSelectors.selectProductCart)
  );

  constructor(private readonly store: Store<ProductState>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  addProductToCart(id: string): void {
    this.store.dispatch(ProductActions.addProductToCart({ id }));
  }
  removeProductFromCart(id: string): void {
    this.store.dispatch(ProductActions.removeProductFromCart({ id }));
  }

  orderProducts(): void {
    this.store.dispatch(ProductActions.orderProducts());
  }

  createProducts(file: any): void {
    this.store.dispatch(ProductActions.addProducts({ file }));
  }
}
