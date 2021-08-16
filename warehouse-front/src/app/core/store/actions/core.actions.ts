import { createAction, props } from '@ngrx/store';

export const changeLanguage = createAction(
  '[Core] Change Language',
  props<{ language: string }>()
);

export const addArticles = createAction(
  '[Core] Add Articles',
  props<{ file: any }>()
);
