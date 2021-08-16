import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.models';
import * as ProductActions from '../actions';

export const productsFeatureKey = 'products';

export interface ProductState {
  loading: boolean;
  products: EntityState<Product>;
  cart: Record<string, number>;
}

export const productAdapter = createEntityAdapter<Product>({
  selectId: (product: Product) => product._id,
});

export const productInitialState: ProductState = {
  loading: false,
  products: productAdapter.getInitialState(),
  cart: {},
};

export const productReducer = createReducer(
  productInitialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    ProductActions.loadProductsSuccess,
    ProductActions.addProductsSuccess,
    (state, { products }) => ({
      ...state,
      loading: false,
      products: productAdapter.addMany(products, state.products),
    })
  ),
  on(
    ProductActions.loadProductsFailure,
    ProductActions.addProductsFailure,
    (state) => ({
      ...state,
      loading: false,
    })
  ),
  on(ProductActions.addProductToCart, (state, { id }) => {
    const newAmount = state.cart[id] ? state.cart[id]! + 1 : 1;
    const newCart = { ...state.cart };
    newCart[id] = newAmount;
    return { ...state, cart: newCart };
  }),
  on(ProductActions.removeProductFromCart, (state, { id }) => {
    const newCart = { ...state.cart };
    if (!newCart[id] && newCart[id] == 1) {
      delete newCart[id];
    } else {
      newCart[id] = newCart[id]! - 1;
    }
    return { ...state, cart: { ...newCart } };
  }),
  on(ProductActions.orderProductsSuccess, (state) => {
    return { ...state, cart: {} };
  })
);
