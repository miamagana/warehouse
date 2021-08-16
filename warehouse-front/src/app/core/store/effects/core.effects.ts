import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import * as CoreActions from '../actions/core.actions';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private readonly translationService: TranslocoService,
    private readonly articleService: ArticleService
  ) {}

  changeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.changeLanguage),
        tap(({ language }) => {
          this.translationService.setActiveLang(language);
        })
      ),
    { dispatch: false }
  );

  addProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.addArticles),
      switchMap(({ file }) =>
        this.articleService.addArticles(file).pipe(catchError(() => EMPTY))
      )
    )
  );
}
