import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.models';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure'
);

export const addProducts = createAction(
  '[Products] Add Products',
  props<{ file: any }>()
);
export const addProductsSuccess = createAction(
  '[Products] Add Products Success',
  props<{ products: Product[] }>()
);
export const addProductsFailure = createAction(
  '[Products] Add Products Failure'
);

export const addProductToCart = createAction(
  '[Products] Add Product to Cart',
  props<{ id: string }>()
);
export const removeProductFromCart = createAction(
  '[Products] Remove Product from Cart',
  props<{ id: string }>()
);

export const orderProducts = createAction('[Products] Order Products');
export const orderProductsSuccess = createAction(
  '[Products] Order Products Success'
);
export const orderProductsFailure = createAction(
  '[Products] Load Products Failure'
);
