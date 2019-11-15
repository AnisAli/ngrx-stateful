/* NgRx */
import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name',
  SetUser =  '[User] Set User',
  ResetUser = '[User] Reset User',
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;
  constructor(public payload: boolean) { }
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SetUser;
  constructor(public payload: User) { }
}

export class ResetUser implements Action {
  readonly type = UserActionTypes.ResetUser;
  constructor() { }
}

export type UserActions = MaskUserName | SetUser | ResetUser ;
