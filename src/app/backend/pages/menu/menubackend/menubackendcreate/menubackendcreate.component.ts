import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-menubackendcreate',
  templateUrl: './menubackendcreate.component.html',
  styleUrls: ['../menubackend.component.scss']
})
export class MenuBackendCreateComponent implements OnInit {

  Action = "Create";
  Icon = "menu";

  form: FormGroup;

  mode = 'determinate';
  upload: any;

  menubackends: FirebaseListObservable<any[]>;
  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private router: Router,
    public db: AngularFireDatabase
  ) {
    this.form = this.fb.group({
      menu_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Menu Backend';

    this.menubackends = this.db.list('/menubackends');
  }

  disabled: any = '';
  save() {
    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';

    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.menubackends.push({
      menu_name: this.form.value.menu_name.toLowerCase(),
      menu_created: timestamp,
      menu_updated: timestamp,
    }).then(
      val => {
        this.router.navigate(['/admin/menu']);
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
