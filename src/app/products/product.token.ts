import { InjectionToken } from '@angular/core';
import { StoreConfig } from '@ngrx/store/src/store_module';
import * as fromReducer from './state/product.reducer';
import * as fromActions from './state/product.actions';

export const PRODUCT_STORAGE_KEYS = new InjectionToken<keyof fromReducer.State[]>('ProductStorageKeys');
export const PRODUCT_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('ProductStorage');
export const PRODUCT_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.State, fromActions.ProductActions>>('ProductConfigToken');