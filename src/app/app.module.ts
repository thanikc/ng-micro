import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegrationComponent } from './integration/integration.component';
import { IntegrationService } from './integration/integration.service';

@NgModule({
  declarations: [
    AppComponent,
    IntegrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [IntegrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
