import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  websites: FirebaseListObservable<any[]>;

  constructor(
    public db: AngularFireDatabase
  ) {

  }

  ngOnInit() {
    this.websites = this.db.list('/websites');
  }

}
