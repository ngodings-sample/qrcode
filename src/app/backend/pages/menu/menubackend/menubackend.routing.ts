import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuBackendViewComponent } from './menubackendview/menubackendview.component';
import { MenuBackendCreateComponent } from './menubackendcreate/menubackendcreate.component';
import { MenuBackendUpdateComponent } from './menubackendupdate/menubackendupdate.component';
import { MenuBackendDetailComponent } from './menubackenddetail/menubackenddetail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: MenuBackendViewComponent },
  { path: 'create', component: MenuBackendCreateComponent },
  { path: 'update/:id', component: MenuBackendUpdateComponent },
  { path: 'detail/:id', component: MenuBackendDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
