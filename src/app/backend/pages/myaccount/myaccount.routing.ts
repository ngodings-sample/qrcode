import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyaccountComponent } from './myaccount.component';
import { MyaccountViewComponent } from './myaccountview/myaccountview.component';
import { MyaccountUpdateComponent } from './myaccountupdate/myaccountupdate.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: MyaccountViewComponent },
  { path: 'update/:id', component: MyaccountUpdateComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
