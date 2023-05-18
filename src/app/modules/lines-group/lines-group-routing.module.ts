import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinesComponent } from './pages/lines/lines.component';
import { GroupsComponent } from './pages/groups/groups.component';

const routes: Routes = [

  {
    path:'lines',
    component:LinesComponent
  },
  {
    path:'groups',
    component:GroupsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesGroupRoutingModule { }
