import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultViewComponent } from './resultview/resultview.component';
import { ResultDetailComponent } from './resultdetail/resultdetail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: ResultViewComponent },
  { path: 'detail/:id', component: ResultDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
