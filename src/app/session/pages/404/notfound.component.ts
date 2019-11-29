import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {

  websites: FirebaseListObservable<any[]>;

  public options = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'top']
  };

  constructor(
    public _service: NotificationsService,
    public db: AngularFireDatabase,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.websites = this.db.list('/websites');
  }
}
