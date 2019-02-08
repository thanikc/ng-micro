import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { UIContext } from 'projects/ui-context/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @Input() title = 'client-a';

  context: UIContext;

  constructor(private elemRef: ElementRef) {}

  ngOnInit() {
    this.context = this.elemRef.nativeElement.context;
  }
  
  callContextAlert() {
    this.context.alert(`A call from ${this.title}`);
  }
}
