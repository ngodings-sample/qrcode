import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './home.routing';

import { HomeComponent } from './home.component';

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
    HomeComponent
  ],
  entryComponents: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class HomeModule { }
