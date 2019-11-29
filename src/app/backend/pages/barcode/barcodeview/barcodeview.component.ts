import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';

import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PaginationInstance } from '../../../../service/ngx-pagination/ngx-pagination.module';

@Component({
  selector: 'app-barcodeview',
  templateUrl: './barcodeview.component.html',
  styleUrls: ['../barcode.component.scss']
})
export class BarcodeViewComponent implements OnInit {

  Action = "View";

  asc: any = 'active';

  positionBelow = "below";

  barcodes: FirebaseListObservable<any[]>;

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
    this._componentPageTitle.title = 'Barcode';

    this.barcodes = this.db.list('/barcodes');
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  dialogRef: MdDialogRef<any>;
  deleteDialog(barcodeID, barcodeName, fullPath) {
    this.dialogRef = this.dialog.open(DialogDeleteBarcode, {
      height: '315px',
      width: '500px',
    });
    this.dialogRef.componentInstance.barcodeID = barcodeID;
    this.dialogRef.componentInstance.barcodeName = barcodeName;
    this.dialogRef.componentInstance.fullPath = fullPath;
  }
}

@Component({
  selector: 'app-barcodedelete',
  templateUrl: 'barcodedelete.component.html',
  styleUrls: ['../barcode.component.scss']
})
export class DialogDeleteBarcode {

  barcodeID: string;
  barcodeName: string;      
  fullPath:string;

  barcodes: FirebaseListObservable<any[]>;

  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    public db: AngularFireDatabase) {
    this.barcodes = this.db.list('/barcodes');
  }

  delete(barcodeID, barcodeName, fullPath) {
    this.barcodes.remove(barcodeID).then(
      val => {
        let storagePath = fullPath;
        firebase.storage().ref().child(storagePath).delete().then(
        val => {
          this._service.html("Deleted Barcode : " + barcodeName, 'error');
        },
        error => {
          this._service.html("Error Deleted Barcode " + error);
        })
      },
      error => {
        this._service.html("Error Deleted Barcode " + error);
      }
    );
  }
}
