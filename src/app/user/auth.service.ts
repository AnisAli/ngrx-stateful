import { Injectable } from '@angular/core';

import { User } from './user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    redirectUrl: string;

    constructor() {  }

    login(userName: string, password: string){
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
      return  of( {
            id: 2,
            userName,
            isAdmin: false
        });
    }

}
