import { Component, ViewChild, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser'
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";

import { TranslateService } from '@ngx-translate/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
const SMALL_WIDTH_BREAKPOINT = 840;

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss'],
})
export class BackendComponent implements OnInit {

  currentLang = 'en';
  language = 'language';
  websites: FirebaseListObservable<any[]>;

  constructor(
    private _router: Router,
    private metaService: Meta,
    public db: AngularFireDatabase,
    public translate: TranslateService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|id/) ? browserLang : 'en');

    this.db.list('/websites', {
      preserveSnapshot: true
    }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.metaService.addTag({ name: 'application-name', content: snapshot.val().website_name });
        this.metaService.addTag({ name: 'author', content: snapshot.val().website_author });
        this.metaService.addTag({ name: 'description', content: snapshot.val().website_description });
        this.metaService.addTag({ name: 'keyword', content: snapshot.val().website_keyword });
        this.metaService.addTag({ name: 'copyright', content: snapshot.val().website_post + ', ' + snapshot.val().website_name });
        this.metaService.addTag({ name: 'language', content: 'id' });
        this.metaService.addTag({ name: 'geo.placename', content: 'Indonesia' });

        this.metaService.addTag({ name: 'og:title', content: snapshot.val().website_name });
        this.metaService.addTag({ name: 'og:description', content: snapshot.val().website_description });
        this.metaService.addTag({ name: 'og:site_name', content: snapshot.val().website_name });
        this.metaService.addTag({ name: 'og:url', content: 'https://www.ngodings.com' });
        this.metaService.addTag({ name: 'og:image', content: 'https://www.ngodings.com' });
      })
    })
  }
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  ngOnInit() {
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
  }
}
