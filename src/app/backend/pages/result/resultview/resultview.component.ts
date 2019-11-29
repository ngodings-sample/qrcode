import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PaginationInstance } from '../../../../service/ngx-pagination/ngx-pagination.module';

@Component({
  selector: 'app-resultview',
  templateUrl: './resultview.component.html',
  styleUrls: ['../result.component.scss']
})
export class ResultViewComponent implements OnInit {

  Action = "View";

  asc: any = 'active';

  positionBelow = "below";

  results: FirebaseListObservable<any[]>;

  public filter: string = '';
  empty = '';
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

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    public dialog: MdDialog,
    public _service: NotificationsService,
    public db: AngularFireDatabase
  ) {

  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Result';

    this.results = this.db.list('/results');
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  dialogRef: MdDialogRef<any>;
  deleteDialog(barcodeKey, barcodeID) {
    this.dialogRef = this.dialog.open(DialogDeleteResult, {
      height: '315px',
      width: '500px',
    });
    this.dialogRef.componentInstance.barcodeKey = barcodeKey;
    this.dialogRef.componentInstance.barcodeID = barcodeID;
  }
}

@Component({
  selector: 'app-resultdelete',
  templateUrl: 'resultdelete.component.html',
  styleUrls: ['../result.component.scss']
})
export class DialogDeleteResult {

  barcodeKey: string;
  barcodeID: string;

  results: FirebaseListObservable<any[]>;

  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    public db: AngularFireDatabase) {
    this.results = this.db.list('/results');
  }

  delete(barcodeKey, barcodeID) {
    this.results.remove(barcodeKey).then(
      val => {
        this._service.html("Deleted Result : " + barcodeID, 'error');
      },
      error => {
        this._service.html("Error Deleted Result " + error);
     }
    )
  }
}
