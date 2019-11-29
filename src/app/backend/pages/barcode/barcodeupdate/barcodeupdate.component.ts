import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-barcodeupdate',
  templateUrl: './barcodeupdate.component.html',
  styleUrls: ['../barcode.component.scss']
})
export class BarcodeUpdateComponent implements OnInit {

  Action = "Update";
  Icon = "code";

  form: FormGroup;

  BarcodeName: string;
  barcodes: FirebaseListObservable<any[]>;

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
      barcode_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      barcode_key: ['']
    });
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Barcode';

    this.BarcodeName = this.route.snapshot.params['id'];

    this.db.list('/barcodes', {
      query: {
        orderByChild: "barcode_name",
        equalTo: this.BarcodeName,
        limitToLast: 1
      }, preserveSnapshot: true
    })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.form.patchValue({
            barcode_name: snapshot.val().barcode_name,
            barcode_key: snapshot.key
          });
        })
      })

    this.barcodes = this.db.list('/barcodes', {
      query: {
        orderByChild: "barcode_name",
        equalTo: this.BarcodeName,
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
    this.barcodes.update(this.form.value.barcode_key, {
      barcode_name: this.form.value.barcode_name,
      barcode_updated: timestamp,
    }).then(
      val => {
        this.router.navigate(['/admin/barcode']);
      },
      error => {
        console.log(error);
      })
  }

  reset() {
    this.form.reset();
  }
}
