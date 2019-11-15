// Homework
import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const isLoggedIn = createSelector(
  getUserFeatureState,
  state => !!state.currentUser
);

export const getCurrentUserName = createSelector(
  getUserFeatureState,
  state => state.currentUser? state.currentUser.userName : '',
);

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };
    case UserActionTypes.SetUser:
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.ResetUser:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
}
