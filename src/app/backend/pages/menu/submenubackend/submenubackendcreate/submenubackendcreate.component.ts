import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-submenubackendcreate',
  templateUrl: './submenubackendcreate.component.html',
  styleUrls: ['../submenubackend.component.scss']
})
export class SubMenuBackendCreateComponent implements OnInit {

  Action = "Create";
  Icon = "subject";

  form: FormGroup;

  mode = 'determinate';
  upload: any;

  submenubackends: FirebaseListObservable<any[]>;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private router: Router,
    public db: AngularFireDatabase
  ) {
    this.form = this.fb.group({
      submenu_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      submenu_url: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      submenu_icon: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(18)]]
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Submenu Backend';

    this.submenubackends = this.db.list('/submenubackends');
  }

  disabled: any = '';
  save() {
    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';
    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.submenubackends.push({
      submenu_name: this.form.value.submenu_name.toLowerCase(),
      submenu_url: this.form.value.submenu_url.toLowerCase(),
      submenu_icon: this.form.value.submenu_icon.toLowerCase(),
      submenu_created: timestamp,
      submenu_updated: timestamp,
    }).then(
      val => {
        this.router.navigate(['/admin/submenu']);
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
