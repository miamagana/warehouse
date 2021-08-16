import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { availableLangs } from '../../../transloco/transloco-root.module';
import { AppState } from '../../store';
import * as CoreActions from '../../store/actions/core.actions';
import * as CoreSelectors from '../../store/selectors/core.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  availableLanguajes = availableLangs;
  activeLanguage$: Observable<string> = this.store.pipe(
    select(CoreSelectors.selectActiveLanguage)
  );

  constructor(private readonly store: Store<AppState>) {}

  changeLanguage(language: string) {
    this.store.dispatch(CoreActions.changeLanguage({ language }));
  }
}
