import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../../shared/backend/page-title/page-title';
import { Observable } from "rxjs/Rx";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public date;
  websites: FirebaseListObservable<any[]>;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    public db: AngularFireDatabase
  ) {
    this.date = new Date();
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnInit() {
    this._componentPageTitle.title = 'dashboard';
    this.websites = this.db.list('/websites');
  }
}
