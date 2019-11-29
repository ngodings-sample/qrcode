import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './result.routing';

import { ResultComponent } from './result.component';
import { ResultViewComponent, DialogDeleteResult } from './resultview/resultview.component';
import { ResultDetailComponent } from './resultdetail/resultdetail.component';

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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    BackendPipeModule,
    SimpleNotificationsModule,
    routing
  ],
  declarations: [
    ResultComponent,
    ResultViewComponent,
    ResultDetailComponent,
    DialogDeleteResult
  ],
  entryComponents: [
    DialogDeleteResult
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ResultModule { }
