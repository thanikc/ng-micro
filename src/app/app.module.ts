import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegrationComponent } from './integration/integration.component';
import { IntegrationService } from './integration/integration.service';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    IntegrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [IntegrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
