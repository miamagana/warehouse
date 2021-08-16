import { Component } from '@angular/core';
import { RouterState } from '@angular/router';
import { Store } from '@ngrx/store';
import { go } from '../../store';
import { addArticles } from '../../store/actions/core.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  constructor(private readonly store: Store<RouterState>) {}

  goToProducts(): void {
    this.store.dispatch(go({ path: ['products'] }));
  }

  createArticles(file: any): void {
    this.store.dispatch(addArticles({ file }));
  }
}
