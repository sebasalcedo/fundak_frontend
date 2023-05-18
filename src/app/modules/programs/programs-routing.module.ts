import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsListComponent } from './pages/programs-list/programs-list.component';
import { RegisterUpdateProgramsComponent } from './pages/register-update-programs/register-update-programs.component';

const routes: Routes = [
  {
    path:'listPrograms',
    component:ProgramsListComponent
  },
  {
    path:'registerPrograms',
    component:RegisterUpdateProgramsComponent
  },
  {
    path:'UpdatedProgram/:id',
    component:RegisterUpdateProgramsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
