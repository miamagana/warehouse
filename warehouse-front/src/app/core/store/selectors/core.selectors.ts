import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { CoreState } from '../reducers/core.reducer';

export const getCoreState = createFeatureSelector<AppState, CoreState>('core');

export const selectActiveLanguage = createSelector(
  getCoreState,
  (state: CoreState) => state.activeLanguage
);
