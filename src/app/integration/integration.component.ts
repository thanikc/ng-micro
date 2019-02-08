import { Component, OnInit, OnDestroy, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap, map, switchMapTo, distinctUntilChanged } from 'rxjs/operators';

import { AppState } from 'app/store/state/app.state';
import { selectSelectedItem, selectItems } from 'app/store/selectors/structure.selectors';
import { GetStructureItem } from 'app/store/actions/structure.action';
import { StructureItem } from 'app/models/structure.interface';
import { UIContextImpl } from './ui-context';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;

  structureItem$ = this.store.pipe(select(selectSelectedItem));
  private sub: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.store.pipe(select(selectItems)).pipe(
      distinctUntilChanged(),
      switchMapTo(this.structureItem$),
      tap(item => {
        if (item) {
          this.setupDependencies(item);
          this.setupComponent(item);
        }
      }),
      switchMapTo(this.route.params),
      map(params => this.store.dispatch(new GetStructureItem(params.id))),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setupComponent(item: StructureItem): void {
    const content = this.content.nativeElement;
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    const elem = document.createElement(item.id);
    for (let key in item.props) {
      elem.setAttribute(key, item.props[key]);
    }
    elem['context'] = new UIContextImpl();
    content.appendChild(elem);
  }

  setupDependencies(item: StructureItem): void {
    for (let src of item.dependencies || []) {
      this.createScript(src);
    }
    this.createScript(item.src);
  }

  createScript(src: string, async = false): void {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = async;
      document.body.appendChild(script);
    }
  }
}
