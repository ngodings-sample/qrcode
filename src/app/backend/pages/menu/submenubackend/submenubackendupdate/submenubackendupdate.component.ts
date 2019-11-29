import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-submenubackendupdate',
  templateUrl: './submenubackendupdate.component.html',
  styleUrls: ['../submenubackend.component.scss']
})
export class SubMenuBackendUpdateComponent implements OnInit {


  Action = "Update";
  Icon = "subject";

  form: FormGroup;

  SubMenuName: string;
  submenubackends: FirebaseListObservable<any[]>;

  mode = 'determinate';
  upload: any;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public db: AngularFireDatabase
  ) {
    this.form = this.fb.group({
      submenu_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      submenu_url: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      submenu_icon: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(18)]],
      submenu_key: ['']
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Submenu Backend';

    this.SubMenuName = this.route.snapshot.params['id'];

    this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name",
        equalTo: this.SubMenuName,
        limitToLast: 1
      }, preserveSnapshot: true
    })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.form.patchValue({
            submenu_name: snapshot.val().submenu_name,
            submenu_url: snapshot.val().submenu_url,
            submenu_icon: snapshot.val().submenu_icon,
            submenu_key: snapshot.key
          });
        })
      })

    this.submenubackends = this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name",
        equalTo: this.SubMenuName,
        limitToLast: 1
      }
    })
  }

  disabled: any = '';
  save() {
    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';

    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.submenubackends.update(this.form.value.submenu_key, {
      submenu_name: this.form.value.submenu_name.toLowerCase(),
      submenu_url: this.form.value.submenu_url.toLowerCase(),
      submenu_icon: this.form.value.submenu_icon.toLowerCase(),
      submenu_updated: timestamp,
    }).then(
      val => {
        this.router.navigate(['/admin/submenu']);
      },
      error => {
        console.log(error);
      })
  }

  reset() {
    this.form.reset();
  }
}
