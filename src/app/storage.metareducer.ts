import { ActionReducer, Action } from '@ngrx/store';
import { merge, pick } from 'lodash-es';
import { LocalStorageService } from './local-storage.service';

export function storageMetaReducer<S, A extends Action = Action>(saveKeys: string[],
                                                                 localStorageKey: string,
                                                                 storageService: LocalStorageService) {
                                                                  
  let onInit = true; // after load/refresh…
  return (reducer: ActionReducer<S, A>) => {
    return function(state: S, action: A): S {
      // get to the nextState.
      const nextState = reducer(state, action);
      // init the application state.
      if (onInit) {
        onInit = false;
        const savedState = storageService.getSavedState(localStorageKey);
        return merge(nextState, savedState);
      }

      // save the next state to the application storage.
      console.log(nextState);
      console.log(saveKeys);
      const stateToSave = pick(nextState, saveKeys);
      console.log(stateToSave);
      storageService.setSavedState(stateToSave, localStorageKey);

      return nextState;
    };
  };
}
