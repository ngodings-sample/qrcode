import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-submenubackenddetail',
  templateUrl: './submenubackenddetail.component.html',
  styleUrls: ['../submenubackend.component.scss']
})
export class SubMenuBackendDetailComponent implements OnInit {

  Action = "Detail";
  Icon = "subject";

  positionBelow = 'below';

  SubMenuName: string;
  submenubackends: FirebaseListObservable<any[]>;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private route: ActivatedRoute,
    public db: AngularFireDatabase) {

  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Submenu Backend';

    this.SubMenuName = this.route.snapshot.params['id'];

    this.submenubackends = this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name",
        equalTo: this.SubMenuName
      }
    })
  }
}
