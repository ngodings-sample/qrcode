import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubMenuBackendViewComponent } from './submenubackendview/submenubackendview.component';
import { SubMenuBackendCreateComponent } from './submenubackendcreate/submenubackendcreate.component';
import { SubMenuBackendUpdateComponent } from './submenubackendupdate/submenubackendupdate.component';
import { SubMenuBackendDetailComponent } from './submenubackenddetail/submenubackenddetail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: SubMenuBackendViewComponent },
  { path: 'create', component: SubMenuBackendCreateComponent },
  { path: 'update/:id', component: SubMenuBackendUpdateComponent },
  { path: 'detail/:id', component: SubMenuBackendDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
