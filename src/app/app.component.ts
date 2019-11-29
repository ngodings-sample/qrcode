import { Component, Inject} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Title, DOCUMENT } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-layout',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    titleService: Title,
    router: Router,
    activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document,
    translate: TranslateService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        titleService.setTitle(title);
      }
    });

    translate.addLangs(['en', 'id']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|id/) ? browserLang : 'en');
  }
  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  ngOnInit(): void {

  }
}
