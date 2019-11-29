import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';

import { routing } from './website.routing';

import { WebsiteComponent } from './website.component';
import { WebsiteViewComponent, DialogDeleteWebsite } from './websiteview/websiteview.component';
import { WebsiteCreateComponent } from './websitecreate/websitecreate.component';
import { WebsiteUpdateComponent } from './websiteupdate/websiteupdate.component';
import { WebsiteUpdateImageComponent } from './websiteupdateimage/websiteupdateimage.component';

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

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    routing
  ],
  declarations: [
    WebsiteComponent,
    WebsiteViewComponent,
    WebsiteCreateComponent,
    WebsiteUpdateComponent,
    WebsiteUpdateImageComponent,
    DialogDeleteWebsite
  ],
  entryComponents: [
    DialogDeleteWebsite
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class WebsiteModule { }
