import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PagesNotFoundComponent } from './components/pages-not-found/pages-not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const componentsModule = [
  NavbarComponent,
  SidebarComponent,
  BreadcrumbsComponent,
  FooterComponent,
  SpinnerComponent,
  PagesNotFoundComponent
];

@NgModule({
  declarations: [componentsModule ],
  imports: [CommonModule, SharedRoutingModule,   FormsModule,
    ReactiveFormsModule,NgxSpinnerModule],
  exports: [componentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
