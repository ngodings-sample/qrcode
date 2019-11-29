import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  websites: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.websites = this.db.list('/websites');
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.users = this.db.list('/users', {
          query: {
            orderByChild: "email",
            equalTo: user.email
          }
        });
      }
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}
