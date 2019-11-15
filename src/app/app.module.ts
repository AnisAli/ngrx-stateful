import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './home/shell.component';
import { MenuComponent } from './home/menu.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

/* Feature Modules */
import { UserModule } from './user/user.module';

/* NgRx */
import { StoreModule, MetaReducer, META_REDUCERS, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageService } from './local-storage.service';
import { storageMetaReducer } from './storage.metareducer';
import { ROOT_LOCAL_STORAGE_KEY, ROOT_STORAGE_KEYS } from './app.token';
import { reducers } from './state';

export function getMetaReducers(saveKeys: string[],
                                localStorageKey: string,
                                storageService: LocalStorageService
): MetaReducer<any> {
  return storageMetaReducer(saveKeys, localStorageKey, storageService);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([])
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  providers: [
    { provide: ROOT_STORAGE_KEYS, useValue: ['user'], multi: true},
    { provide: ROOT_LOCAL_STORAGE_KEY, useValue: '__app_storage__', multi: true},
    {
      provide: META_REDUCERS,
      deps: [ROOT_STORAGE_KEYS, ROOT_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getMetaReducers,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
