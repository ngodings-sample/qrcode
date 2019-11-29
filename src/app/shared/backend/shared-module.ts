import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';

import { RouterModule } from '@angular/router';

// Angular Material
import { MaterialModule } from '@angular/material';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    RouterModule,
    BrowserModule,
    MaterialModule,
  ],
  declarations: [
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    PageHeaderComponent
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    PageHeaderComponent
  ],
  providers: [],
  entryComponents: [],
})
export class SharedModuleBackend { }
