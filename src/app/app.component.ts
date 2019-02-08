import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppState } from './store/state/app.state';
import { GetStructure } from './store/actions/structure.action';
import { selectItems } from './store/selectors/structure.selectors';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  structure$ = this.store.pipe(select(selectItems));
  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private zone: NgZone,
    private notificationService: NotificationService,
    private snackbar: MatSnackBar
  ) {
    this.sub = notificationService.notification$.subscribe(message => {
      this.zone.run(() => {
        snackbar.open(message, 'OK', { duration: 1000 });
      });
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetStructure());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
