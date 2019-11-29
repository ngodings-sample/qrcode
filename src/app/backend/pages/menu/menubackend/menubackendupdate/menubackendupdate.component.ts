import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-menubackendupdate',
  templateUrl: './menubackendupdate.component.html',
  styleUrls: ['../menubackend.component.scss']
})
export class MenuBackendUpdateComponent implements OnInit {

  Action = "Update";
  Icon = "menu";

  form: FormGroup;

  MenuName: string;
  menubackends: FirebaseListObservable<any[]>;

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
      menu_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      menu_key: ['']
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Menu Backend';

    this.MenuName = this.route.snapshot.params['id'];

    this.menubackends = this.db.list('/menubackends', {
      query: {
        orderByChild: "menu_name",
        equalTo: this.MenuName,
        limitToLast: 1
      }
    });

    this.db.list('/menubackends', {
      query: {
        orderByChild: "menu_name",
        equalTo: this.MenuName
      }, preserveSnapshot: true
    })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.form.patchValue({
            menu_name: snapshot.val().menu_name,
            menu_key: snapshot.key
          });
        })
      })
  }

  disabled: any = '';
  save() {
    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';

    var timestamp = firebase.database.ServerValue.TIMESTAMP;

    this.menubackends.update(this.form.value.menu_key, {
      menu_name: this.form.value.menu_name.toLowerCase(),
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
