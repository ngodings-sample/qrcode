import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './myaccount.routing';

import { MyaccountComponent } from './myaccount.component';
import { MyaccountViewComponent } from './myaccountview/myaccountview.component';
import { MyaccountUpdateComponent } from './myaccountupdate/myaccountupdate.component';

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
    BackendPipeModule,
    SimpleNotificationsModule,
    routing
  ],
  declarations: [
    MyaccountComponent,
    MyaccountViewComponent,
    MyaccountUpdateComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class MyaccountModule { }
