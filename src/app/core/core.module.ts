import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';

import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PaginatePipe } from './pipes/paginator.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const moduleExports = [PaginatePipe, SearchFilterPipe];

@NgModule({
  declarations: [moduleExports],
  imports: [CommonModule, CoreRoutingModule,   FormsModule,
    ReactiveFormsModule],
  exports: [moduleExports],
})
export class CoreModule {}
