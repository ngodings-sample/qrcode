import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as firebase from 'firebase';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    let promise = new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          let userProfile = firebase.database().ref(`/users/${user.uid}/roles`);
          userProfile.once("value", (snapshot) => {
            let userInfo = snapshot.val().admin;
            if (userInfo === true) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        } else {
          reject(false);
        }
      });

    }).catch(() => {
      this.router.navigate(['/login'])
    });

    return promise.then(() => {
      return true;
    }, error => {
      console.log(error);
    })
  }
}
