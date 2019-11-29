import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidenavComponent implements OnInit {

  menubackends: FirebaseListObservable<any[]>;
  dashboard = 'dashboard';
  constructor(
    public db: AngularFireDatabase
  ) {
  }

  ngOnInit() {
    this.menubackends = this.db.list('/menubackends').map(
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
    return this.menubackends;
  }

}
