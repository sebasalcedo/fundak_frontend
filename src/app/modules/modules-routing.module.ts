import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from './modules.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ModuleComponent,
    canActivate:[ AuthGuard ],
    children: [
      {
        path: 'configurations',
        loadChildren: () =>
          import(`@modules/configurations/configurations.module`).then(
            (m) => m.ConfigurationsModule
          ),
      },
      {
        path: 'lines_Groups',
        loadChildren: () =>
          import(`@modules/lines-group/lines-group.module`).then(
            (m) => m.LinesGroupModule
          ),
      },
      {
        path: 'programs',
        loadChildren: () =>
          import(`@modules/programs/programs.module`).then(
            (m) => m.ProgramsModule
          ),

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
