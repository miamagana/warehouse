import { Action, createReducer, on } from '@ngrx/store';
import { defaultLang } from '../../../transloco/transloco-root.module';
import * as CoreActions from '../actions/core.actions';

export interface CoreState {
  activeLanguage: string;
}

export const initialState: CoreState = {
  activeLanguage: defaultLang,
};

export const _coreReducer = createReducer(
  initialState,
  on(CoreActions.changeLanguage, (state, { language }) => ({
    ...state,
    activeLanguage: language,
  }))
);
