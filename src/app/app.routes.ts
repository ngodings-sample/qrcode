import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Auth
import { AdminGuard } from './auth/guard/admin.guard';

import { BackendComponent } from './backend/backend.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', loadChildren: 'app/session/pages/login/login.module#LoginModule', data: { title: 'Administrator - Ngodings' } },
  {
    path: 'admin', component: BackendComponent, canActivate: [AdminGuard], data: { title: 'Administrator - Ngodings' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/backend/pages/home/home.module#HomeModule' },
      { path: 'myaccount', loadChildren: 'app/backend/pages/myaccount/myaccount.module#MyaccountModule' },
      { path: 'website', loadChildren: 'app/backend/pages/website/website.module#WebsiteModule' },
      { path: 'menu', loadChildren: 'app/backend/pages/menu/menubackend/menubackend.module#MenuBackendModule' },
      { path: 'submenu', loadChildren: 'app/backend/pages/menu/submenubackend/submenubackend.module#SubmenuBackendModule' },
      { path: 'barcode', loadChildren: 'app/backend/pages/barcode/barcode.module#BarcodeModule' },
      { path: 'result', loadChildren: 'app/backend/pages/result/result.module#ResultModule' }
    ]
  },
  { path: '404', loadChildren: 'app/session/pages/404/notfound.module#NotFoundModule', data: { title: 'Halaman Tidak Ditemukan - Ngodings' } },
  { path: '**', redirectTo: '404' }
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
