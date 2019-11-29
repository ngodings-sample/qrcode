import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-myaccountupdate',
  templateUrl: './myaccountupdate.component.html',
  styleUrls: ['../myaccount.component.scss']
})
export class MyaccountUpdateComponent implements OnInit {

  Action = "Update";
  Icon = "attach_money";

  form: FormGroup;

  users: FirebaseListObservable<any[]>;

  mode = 'determinate';
  upload: any;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    this.form = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      no_telp: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      userkey: [''],
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {

    this._componentPageTitle.title = 'My Account';
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.db.list('/users', {
          query: {
            orderByChild: "email",
            equalTo: user.email,
            limitToLast: 1
          }, preserveSnapshot: true
        })
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              this.form.patchValue({
                displayName: snapshot.val().displayName,
                address: snapshot.val().address,
                no_telp: snapshot.val().no_telp,
                userkey: user.uid
              });
            })
          })
        this.users = this.db.list('/users', {
          query: {
            orderByChild: "email",
            equalTo: user.email
          }
        });
      }
    });

  }
  disabled: any = '';
  save() {

    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';
    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.users.update(this.form.value.userkey, {
      displayName: this.form.value.displayName,
      no_telp: this.form.value.no_telp,
      address: this.form.value.address,
      updated: timestamp,
    }).then(
      val => {

        this.router.navigate(['/admin/myaccount']);
      },
      error => {

        console.log(error);
      }
      );
  }

  reset() {
    this.form.reset();
  }
}
