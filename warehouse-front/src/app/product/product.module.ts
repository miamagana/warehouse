import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { Route, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productsFeatureKey, productReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from './services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Route[] = [{ path: '**', component: ProductListComponent }];

@NgModule({
  declarations: [ProductCardComponent, ProductListComponent, OrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(productsFeatureKey, productReducer),
    EffectsModule.forFeature(effects),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
