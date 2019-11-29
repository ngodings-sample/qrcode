import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './menubackend.routing';

import { MenuBackendComponent } from './menubackend.component';
import { MenuBackendViewComponent, DialogCreateMenuBackend, DialogDeleteMenuBackend, DialogDeleteSubMenuBackendMenuBackend } from './menubackendview/menubackendview.component';
import { MenuBackendCreateComponent } from './menubackendcreate/menubackendcreate.component';
import { MenuBackendUpdateComponent } from './menubackendupdate/menubackendupdate.component';
import { MenuBackendDetailComponent } from './menubackenddetail/menubackenddetail.component';

// Pipe
import { BackendPipeModule } from '../../../backend.pipe.module';

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
    NgUploaderModule,
    BackendPipeModule,
    SimpleNotificationsModule,
    routing
  ],
  declarations: [
    MenuBackendComponent,
    MenuBackendViewComponent,
    MenuBackendCreateComponent,
    MenuBackendUpdateComponent,
    MenuBackendDetailComponent,
    DialogCreateMenuBackend,
    DialogDeleteMenuBackend,
    DialogDeleteSubMenuBackendMenuBackend
  ],
  entryComponents: [
    DialogCreateMenuBackend,
    DialogDeleteMenuBackend,
    DialogDeleteSubMenuBackendMenuBackend
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class MenuBackendModule { }
