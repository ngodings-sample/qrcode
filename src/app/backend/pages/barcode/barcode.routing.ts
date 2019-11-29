import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarcodeViewComponent } from './barcodeview/barcodeview.component';
import { BarcodeCreateComponent } from './barcodecreate/barcodecreate.component';
import { BarcodeUpdateComponent } from './barcodeupdate/barcodeupdate.component';
import { BarcodeDetailComponent } from './barcodedetail/barcodedetail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: BarcodeViewComponent },
  { path: 'create', component: BarcodeCreateComponent },
  { path: 'update/:id', component: BarcodeUpdateComponent },
  { path: 'detail/:id', component: BarcodeDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
