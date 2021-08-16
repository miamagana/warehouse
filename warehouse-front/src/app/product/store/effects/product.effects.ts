import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as ProductActions from '../actions/product.actions';
import * as ProductSelectors from '../selectors/product.selectors';
import { ProductState } from '../reducers';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store<ProductState>
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError(() => of(ProductActions.loadProductsFailure))
        )
      )
    )
  );

  addProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProducts),
      switchMap(({ file }) =>
        this.productService.addProducts(file).pipe(
          map((products) => ProductActions.addProductsSuccess({ products })),
          catchError(() => of(ProductActions.addProductsFailure))
        )
      )
    )
  );

  orderProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.orderProducts),
      concatLatestFrom(() =>
        this.store.select(ProductSelectors.selectProductCart)
      ),
      switchMap(([_, cart]) =>
        this.productService.orderProducts(cart).pipe(
          map(() => ProductActions.orderProductsSuccess()),
          catchError(() => of(ProductActions.orderProductsFailure))
        )
      )
    )
  );
}
