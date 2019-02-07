import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IntegrationService } from './integration.service';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private service: IntegrationService) { }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      tap(params => {
        const structure = this.service.getStructure(params['id']);
        this.setupComponent(structure.id, structure.src);
      }),
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
