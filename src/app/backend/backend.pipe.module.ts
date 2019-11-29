import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuBackendFilter } from './pages/menu/menubackend/menubackend.pipe';
import { SubMenuBackendFilter } from './pages/menu/submenubackend/submenubackend.pipe';
import { BarcodeFilter } from './pages/barcode/barcode.pipe';
import { ResultFilter } from './pages/result/result.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MenuBackendFilter,
    SubMenuBackendFilter,
    BarcodeFilter,
    ResultFilter
  ],
  exports: [
    MenuBackendFilter,
    SubMenuBackendFilter,
    BarcodeFilter,
    ResultFilter
  ]
})

export class BackendPipeModule { }
