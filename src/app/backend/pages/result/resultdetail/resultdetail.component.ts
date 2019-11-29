import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-resultdetail',
  templateUrl: './resultdetail.component.html',
  styleUrls: ['../result.component.scss']
})
export class ResultDetailComponent implements OnInit {

  Action = "Detail";
  Icon = "code";

  positionBelow = 'below';

  BarcodeId: string;
  results: FirebaseListObservable<any[]>;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private route: ActivatedRoute,
    public db: AngularFireDatabase) {

  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Result';

    this.BarcodeId = this.route.snapshot.params['id'];

    this.results = this.db.list('/results', {
      query: {
        orderByChild: "barcode_id",
        equalTo: this.BarcodeId
      }
    })
  }
}
