import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  productAdapter,
  productsFeatureKey,
  ProductState,
} from '../reducers/product.reducer';

export const getProductState =
  createFeatureSelector<ProductState>(productsFeatureKey);

export const selectLoading = createSelector(
  getProductState,
  (state: ProductState) => state.loading
);

export const selectProductCart = createSelector(
  getProductState,
  (state: ProductState) => state.cart
);

export const selectProductState = createSelector(
  getProductState,
  (state: ProductState) => state.products
);

export const { selectAll } = productAdapter.getSelectors();

export const selectAllProducts = createSelector(selectProductState, selectAll);
