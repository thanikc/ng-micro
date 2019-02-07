import { Component, OnInit } from '@angular/core';
import { IntegrationService, Structure } from './integration/integration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  structure: Structure[];
  title = 'ng-micro';

  constructor(private integrationService: IntegrationService) {}

  ngOnInit() {
    this.structure = this.integrationService.structure;
  }
}
