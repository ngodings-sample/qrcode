import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './notfound.component';

export const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
