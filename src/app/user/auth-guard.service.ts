import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router,
         CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../state/app.state';
import * as fromUser from './state/user.reducer';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export  class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string): Observable<boolean> {
    return this.store.pipe(select(fromUser.isLoggedIn), tap(isLogginIn => {

      if (isLogginIn) {
          return true;
      }

      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }));
    // Retain the attempted URL for redirection
  }
}
