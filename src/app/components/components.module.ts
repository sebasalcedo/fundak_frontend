import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const componentsExports = [
  PaginatorComponent,
  SearchInputComponent
]

@NgModule({
  declarations: [
    componentsExports
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    componentsExports
  ]
})
export class ComponentsModule { }
