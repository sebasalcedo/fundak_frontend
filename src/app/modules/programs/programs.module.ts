import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from 'src/app/material.module';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsListComponent } from './pages/programs-list/programs-list.component';
import { RegisterUpdateProgramsComponent } from './pages/register-update-programs/register-update-programs.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ChipListsComponent } from './components/chip-lists/chip-lists.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StepsComponent } from './pages/steps/steps.component';
import { DialogViewStepsComponent } from './components/dialog-view-steps/dialog-view-steps.component';


@NgModule({
  declarations: [
    ProgramsListComponent,
    RegisterUpdateProgramsComponent,
    AutocompleteComponent,
    ChipListsComponent,
    StepsComponent,
    DialogViewStepsComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CoreModule,
  ]
})
export class ProgramsModule { }
