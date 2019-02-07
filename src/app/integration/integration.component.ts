import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, merge } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from 'app/store/state/app.state';
import { selectSelectedItem } from 'app/store/selectors/structure.selectors';
import { GetStructureItem } from 'app/store/actions/structure.action';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;

  structureItem$ = this.store.pipe(select(selectSelectedItem));
  id$ = this.route.params.pipe(map(params => params.id));
  private sub: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = merge(
      this.structureItem$.pipe(tap(item => { if (item) { this.setupComponent(item.id, item.src); } })),
      this.id$.pipe(tap(id => this.store.dispatch(new GetStructureItem(id)))),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setupComponent(id: string, src: string) {
    const content = this.content.nativeElement;
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    const elem = document.createElement(id);
    content.appendChild(elem);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    if (!document.querySelector(`script[src="${src}"]`)) {
      document.body.appendChild(script);
    }
  }
}
