import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { PRODUCT_LOCAL_STORAGE_KEY, PRODUCT_STORAGE_KEYS, PRODUCT_CONFIG_TOKEN } from './product.token';
import { LocalStorageService } from '../local-storage.service';
import { storageMetaReducer } from '../storage.metareducer';

export function getProductConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  console.log('aaa');
  return {metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)]};
}
const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', reducer, PRODUCT_CONFIG_TOKEN),

    EffectsModule.forFeature(
      [ ProductEffects ]
    ),
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  providers: [
    LocalStorageService,
    { provide: PRODUCT_LOCAL_STORAGE_KEY, useValue: '__PRODUCT_storage__' },
    { provide: PRODUCT_STORAGE_KEYS, useValue: ['anis'] },
    {
      provide: PRODUCT_CONFIG_TOKEN,
      deps: [PRODUCT_STORAGE_KEYS, PRODUCT_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getProductConfig
    },
  ]
})
export class ProductModule { }
