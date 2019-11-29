import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { AngularFireAuth } from 'angularfire2/auth';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PaginationInstance } from '../../../../service/ngx-pagination/ngx-pagination.module';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-myaccountview',
  templateUrl: './myaccountview.component.html',
  styleUrls: ['../myaccount.component.scss']
})
export class MyaccountViewComponent implements OnInit {

  Action = "View";

  asc: any = 'active';

  positionBelow = "below";

  listdvds: FirebaseListObservable<any[]>;

  form: FormGroup;

  mode = 'determinate';
  upload: any;

  public filter: string = '';
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

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

  users: FirebaseListObservable<any[]>;
  constructor(
    private _componentPageTitle: ComponentPageTitle,
    public dialog: MdDialog,
    public _service: NotificationsService,
    public afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public db: AngularFireDatabase) {
    this.form = this.fb.group({
      no_telp: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      userkey: [''],
    })
  }

  ngOnInit() {
    this._componentPageTitle.title = 'My Account';
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.form.patchValue({
          userkey: user.uid
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

  resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then((user) => {
        this._service.html("Reset Password : " + email + " Success", 'success');
      }, (error) => {

        this._service.html("Reset Password : " + email + " Error", 'error');
      });
  }
  disabled: any = '';
  save() {

    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';
    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.users.update(this.form.value.userkey, {
      no_telp: this.form.value.no_telp,
      address: this.form.value.address,
      updated: timestamp,
    }).then(
      val => {
        this._service.html("Update Success", 'success');
        this.form.patchValue({
          no_telp: '',
          address: ''
        })
        this.disabled = "false";
      },
      error => {

        this._service.html("Update Failed", 'error'); this.form.patchValue({
          no_telp: '',
          address: ''
        })
        this.disabled = "false";
      }
      );
  }

  reset() {
    this.form.reset();
  }
}
