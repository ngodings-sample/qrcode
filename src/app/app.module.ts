import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';

import { SharedModuleBackend } from './shared/backend/shared-module';

import { environment } from '../environments/environment.prod';

import { ComponentPageTitle } from './shared/backend/page-title/page-title';

if (environment.production) {
  enableProdMode();
}

import 'hammerjs';

// Routes
import { AppRouting } from './app.routes';

// Angular Material
import { MaterialModule } from '@angular/material';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebase/firebase';

// Custom Validation
import { CustomFormsModule } from 'ng2-validation'

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Barcode
import { NgxQRCodeModule } from 'ngx-qrcode2';

// Pagination
import { NgxPaginationModule } from 'ngx-pagination';

// Notif
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

// Upload
import { NgUploaderModule } from 'ngx-uploader';

// Auth
import { AdminGuard } from './auth/guard/admin.guard';

import { ComponentTestComponent } from './service/ngx-pagination/testing/testing-helpers';

// RXJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { AppComponent } from './app.component';

import { BackendComponent } from './backend/backend.component';

// Pipe
import { BackendPipeModule } from './backend/backend.pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    BackendComponent,
    ComponentTestComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    SharedModuleBackend,
    BackendPipeModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule,
    CustomFormsModule,
    NgxPaginationModule,
    NgUploaderModule,
    AppRouting
  ],
  providers: [
    AdminGuard,
    ComponentPageTitle,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
