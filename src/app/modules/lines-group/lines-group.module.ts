import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinesGroupRoutingModule } from './lines-group-routing.module';
import { LinesComponent } from './pages/lines/lines.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { ModalRegisterComponent } from './components/modal-register/modal-register.component';
import { MaterialModule } from 'src/app/material.module';
import { CoreModule } from '../../core/core.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogGroupsComponent } from './components/dialog-groups/dialog-groups.component';


@NgModule({
  declarations: [
    LinesComponent,
    GroupsComponent,
    ModalRegisterComponent,
    DialogGroupsComponent,
  ],
  imports: [
    CommonModule,
    LinesGroupRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    MaterialModule,
    ComponentsModule

  ]
})
export class LinesGroupModule { }
