import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/state/app.state';
import { GetStructure } from './store/actions/structure.action';
import { selectItems } from './store/selectors/structure.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  structure$ = this.store.pipe(select(selectItems));

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetStructure());
  }
}
