import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './barcode.routing';

import { BarcodeComponent } from './barcode.component';
import { BarcodeViewComponent, DialogDeleteBarcode } from './barcodeview/barcodeview.component';
import { BarcodeCreateComponent } from './barcodecreate/barcodecreate.component';
import { BarcodeUpdateComponent } from './barcodeupdate/barcodeupdate.component';
import { BarcodeDetailComponent } from './barcodedetail/barcodedetail.component';

// Barcode
import { NgxQRCodeModule } from 'ngx-qrcode2';

// Pipe
import { BackendPipeModule } from '../../backend.pipe.module';

// Angular Material
import { MaterialModule } from '@angular/material';

// Notif
import { SimpleNotificationsModule } from 'angular2-notifications';

// Pagination
import { NgxPaginationModule } from 'ngx-pagination';

// Upload
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    NgUploaderModule,
    BackendPipeModule,
    SimpleNotificationsModule,
    routing
  ],
  declarations: [
    BarcodeComponent,
    BarcodeViewComponent,
    BarcodeCreateComponent,
    BarcodeUpdateComponent,
    BarcodeDetailComponent,
    DialogDeleteBarcode
  ],
  entryComponents: [
    DialogDeleteBarcode
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class BarcodeModule { }
