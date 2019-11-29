import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PaginationInstance } from '../../../../service/ngx-pagination/ngx-pagination.module';

@Component({
  selector: 'app-websiteview',
  templateUrl: './websiteview.component.html',
  styleUrls: ['../website.component.scss']
})

export class WebsiteViewComponent implements OnInit {

  Action = "View";

  form: FormGroup;

  Icon = "desktop_windows";

  positionRight = 'right';
  positionBelow = 'below';

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
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    public dialog: MdDialog,
    public _service: NotificationsService,
    public db: AngularFireDatabase
  ) {
    this.form = this.fb.group({
      website_name: [''],
      website_author: [''],
      website_description: [''],
      website_keyword: [''],
      website_facebook: [''],
      website_github: [''],
      website_instagram: [''],
      website_bukalapak: [''],
      website_tokopedia: [''],
      website_youtube: [''],
      website_phonenumber: [''],
      website_address: [''],
      website_post: [''],
      website_created: ['']
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Website Information';

    this.websites = this.db.list('/websites');
  }

  dialogRef: MdDialogRef<any>;
  deleteDialog(websiteID, websiteName, path) {
    this.dialogRef = this.dialog.open(DialogDeleteWebsite, {
      height: '315px',
      width: '500px',
    });
    this.dialogRef.componentInstance.websiteID = websiteID;
    this.dialogRef.componentInstance.websiteName = websiteName;
    this.dialogRef.componentInstance.path = path;
  }
}

@Component({
  selector: 'app-websitedelete',
  templateUrl: 'websitedelete.component.html',
  styleUrls: ['../website.component.scss']
})
export class DialogDeleteWebsite {

  websites: FirebaseListObservable<any[]>;
  websiteID: any;
  websiteName: any;
  path: any;
  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    public db: AngularFireDatabase) {
    this.websites = this.db.list('/websites');
  }
  disabled: any = '';
  delete(websiteID, websiteName, path) {
    this.disabled = 'true';
    this.websites.remove(websiteID).then(
      val => {
        let storagePath = path;
        firebase.storage().ref().child(storagePath).delete().then(
          val => {
            this._service.html("Deleted Websites : " + websiteName, 'error');
          },
          error => {
            this._service.html("Error deleted Websites " + error, 'error');
          }
        );
      },
      error => {
        console.log(error)
      }
    );
  }
}
