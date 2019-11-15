import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromUser from '../user/state/user.reducer';
import { State } from './app.state';

// export interface State {
//   layout: fromLayout.State;
// }

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer
};
