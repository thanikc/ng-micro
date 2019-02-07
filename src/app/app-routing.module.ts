import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationComponent } from './integration/integration.component';

const routes: Routes = [
  { path: '', redirectTo: 'element', pathMatch: 'full' },
  { path: 'element', component: IntegrationComponent },
  { path: 'element/:id', component: IntegrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
