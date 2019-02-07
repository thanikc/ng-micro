import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }