import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsiteViewComponent } from './websiteview/websiteview.component';
import { WebsiteCreateComponent } from './websitecreate/websitecreate.component';
import { WebsiteUpdateComponent } from './websiteupdate/websiteupdate.component';
import { WebsiteUpdateImageComponent } from './websiteupdateimage/websiteupdateimage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: WebsiteViewComponent },
  { path: 'create', component: WebsiteCreateComponent },
  { path: 'update/:id', component: WebsiteUpdateComponent },
  { path: 'updateimage/:id', component: WebsiteUpdateImageComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
