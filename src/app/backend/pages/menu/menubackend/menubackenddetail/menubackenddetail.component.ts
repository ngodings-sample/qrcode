import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-menubackenddetail',
  templateUrl: './menubackenddetail.component.html',
  styleUrls: ['../menubackend.component.scss']
})
export class MenuBackendDetailComponent implements OnInit {

  Action = "Detail";
  Icon = "menu";

  positionBelow = 'below';

  MenuName: string;
  menubackends: FirebaseListObservable<any[]>;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private route: ActivatedRoute,
    public db: AngularFireDatabase) {

  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Menu Backend';

    this.MenuName = this.route.snapshot.params['id'];
    this.menubackends = this.db.list('/menubackends', {
      query: {
        orderByChild: "menu_name",
        equalTo: this.MenuName,
        limitToLast: 1
      }
    }).map(
      menubackends => {
        menubackends.map(
          menubackend => {
            menubackend.Data = [];
            for (var p in menubackend.submenubackends) {
              menubackend.Data.push(
                this.db.object('/submenubackends/' + p)
              )
            }
          }
        );
        return menubackends;
      }
    ) as FirebaseListObservable<any[]>;
  }
}
