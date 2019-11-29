import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './submenubackend.routing';

import { SubMenuBackendComponent } from './submenubackend.component';
import { SubMenuBackendViewComponent, DialogDeleteSubmenuBackend } from './submenubackendview/submenubackendview.component';
import { SubMenuBackendCreateComponent } from './submenubackendcreate/submenubackendcreate.component';
import { SubMenuBackendUpdateComponent } from './submenubackendupdate/submenubackendupdate.component';
import { SubMenuBackendDetailComponent } from './submenubackenddetail/submenubackenddetail.component';

// Pipe
import { BackendPipeModule } from '../../../backend.pipe.module';

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
    SubMenuBackendComponent,
    SubMenuBackendViewComponent,
    SubMenuBackendCreateComponent,
    SubMenuBackendUpdateComponent,
    SubMenuBackendDetailComponent,
    DialogDeleteSubmenuBackend
  ],
  entryComponents: [
    DialogDeleteSubmenuBackend
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class SubmenuBackendModule { }
