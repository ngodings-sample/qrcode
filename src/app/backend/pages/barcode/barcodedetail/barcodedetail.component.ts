import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-barcodedetail',
  templateUrl: './barcodedetail.component.html',
  styleUrls: ['../barcode.component.scss']
})
export class BarcodeDetailComponent implements OnInit {

  Action = "Detail";
  Icon = "code";

  positionBelow = 'below';

  BarcodeName: string;
  barcodes: FirebaseListObservable<any[]>;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private route: ActivatedRoute,
    public db: AngularFireDatabase) {

  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Barcode';

    this.BarcodeName = this.route.snapshot.params['id'];

    this.barcodes = this.db.list('/barcodes', {
      query: {
        orderByChild: "barcode_name",
        equalTo: this.BarcodeName
      }
    })
  }
}
