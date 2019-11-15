import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../state/app.state';
import * as fromUser from '../user/state/user.reducer';
import * as userActions from '../user/state/user.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  pageTitle = 'Acme Product Management';
  isLoggedIn$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(private router: Router,
              private store: Store<fromRoot.State>,
              private authService: AuthService) { }

  ngOnInit() {

    this.isLoggedIn$ = this.store.pipe(select(fromUser.isLoggedIn));
    this.userName$ = this.store.pipe(select(fromUser.getCurrentUserName));

  }

  logOut(): void {
    //this.authService.logout();
    this.store.dispatch(new userActions.ResetUser);
    this.router.navigate(['/welcome']);
  }
}
