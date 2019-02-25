import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap, map, switchMapTo, distinctUntilChanged } from 'rxjs/operators';

import { AppState } from 'app/store/state/app.state';
import { selectSelectedItem, selectItems } from 'app/store/selectors/structure.selectors';
import { GetStructureItem } from 'app/store/actions/structure.action';
import { StructureItem } from 'app/models/structure.interface';
import { UIContextService } from '../services/ui-context.service';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;

  structureItem$ = this.store.pipe(select(selectSelectedItem));
  private sub: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private context: UIContextService) { }

  ngOnInit() {
    this.sub = this.store.pipe(select(selectItems)).pipe(
      distinctUntilChanged(),
      switchMapTo(this.route.params), // route parameters
      map(params => this.store.dispatch(new GetStructureItem(params.id))),
      switchMapTo(this.structureItem$), // selected menu item
      tap(item => {
        if (item) {
          this.setupDependencies(item);
          this.setupComponent(item);
        }
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Setup content based on menu item
   * @param item 
   */
  private setupComponent(item: StructureItem): void {
    const content = this.content.nativeElement;
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    const elem = document.createElement(item.id);
    for (let key in item.props) {
      elem.setAttribute(key, item.props[key]);
    }
    elem['context'] = this.context;
    content.appendChild(elem);
  }

  /**
   * Setup javascript dependencies
   * @param item 
   */
  private setupDependencies(item: StructureItem): void {
    for (let src of item.dependencies || []) {
      this.createScript(src);
    }
    this.createScript(item.src);
  }

  /**
   * Create script tag
   * @param src 
   * @param async 
   */
  private createScript(src: string, async = false): void {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = async;
      document.body.appendChild(script);
    }
  }
}
