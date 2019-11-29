import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';

import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PaginationInstance } from '../../../../../service/ngx-pagination/ngx-pagination.module';

@Component({
  selector: 'app-submenubackendview',
  templateUrl: './submenubackendview.component.html',
  styleUrls: ['../submenubackend.component.scss']
})
export class SubMenuBackendViewComponent implements OnInit {

  Action = "View";

  asc: any = 'active';

  positionBelow = "below";

  submenubackends: FirebaseListObservable<any[]>;

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
    this._componentPageTitle.title = 'Submenu Backend';

    this.submenubackends = this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name"
      }
    });
  }

  orderByNameAsc() {
    this.asc = "active";
    this.submenubackends = this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name"
      }
    });
  }

  orderByNameDesc() {
    this.asc = "deactive";
    this.submenubackends = this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name"
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  dialogRef: MdDialogRef<any>;
  deleteDialog(submenubackendID, menubackendID, submenuName) {
    this.dialogRef = this.dialog.open(DialogDeleteSubmenuBackend, {
      height: '315px',
      width: '500px',
    });
    this.dialogRef.componentInstance.submenubackendID = submenubackendID;
    this.dialogRef.componentInstance.menubackendID = menubackendID;
    this.dialogRef.componentInstance.submenuName = submenuName;
  }
}

@Component({
  selector: 'app-submenubackenddelete',
  templateUrl: 'submenubackenddelete.component.html',
  styleUrls: ['../submenubackend.component.scss']
})
export class DialogDeleteSubmenuBackend {

  submenubackendID: string;
  submenuName: string;
    menubackendID: string;

  submenubackends: FirebaseListObservable<any[]>;

  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    public db: AngularFireDatabase) {
    this.submenubackends = this.db.list('/submenubackends');
  }

  delete(submenubackendID, menubackendID, submenuName) {
    this.submenubackends.remove(submenubackendID).then(
      val => {
        this._service.html("Deleted Submenu : " + submenuName + " <i class='fa fa-check'></i>", 'error');
      },
      error => {
        this._service.html("Error deleted Submenu " + error);
      },
    )
  }
}
