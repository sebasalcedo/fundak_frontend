import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { ModulesRoutingModule } from './modules/modules-routing.module';
import { PagesNotFoundComponent } from '@shared/components/pages-not-found/pages-not-found.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PagesNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    ModulesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
