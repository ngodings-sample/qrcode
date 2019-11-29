import { Component, OnInit, Inject } from '@angular/core';
import { ComponentPageTitle } from '../../../../../shared/backend/page-title/page-title';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { PaginationInstance } from '../../../../../service/ngx-pagination/ngx-pagination.module';

@Component({
  selector: 'app-menubackendview',
  templateUrl: './menubackendview.component.html',
  styleUrls: ['../menubackend.component.scss']
})
export class MenuBackendViewComponent implements OnInit {

  Action = "View";

  positionBelow = "below";
  positionRight = "right";

  menubackends: FirebaseListObservable<any[]>;
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
    this._componentPageTitle.title = 'Menu';

    this.submenubackends = this.db.list('/submenubackends');
    this.menubackends = this.db.list('/menubackends').map(
      menubackends => {
        menubackends.map(
          menubackend => {
            menubackend.Data = [];
            for (var p in menubackend.submenubackends) {
              menubackend.Data.push(
                this.db.object('/submenubackends/' + p)
              )
            }
          }
        );
        return menubackends;
      }
    ) as FirebaseListObservable<any[]>;
    return this.menubackends;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  dialogRef: MdDialogRef<any>;
  deleteDialog(menubackendID, menubackendName) {
    this.dialogRef = this.dialog.open(DialogDeleteMenuBackend, {
      height: '300px',
      width: '500px',
    });
    this.dialogRef.componentInstance.menubackendID = menubackendID;
    this.dialogRef.componentInstance.menubackendName = menubackendName;
  }

  deleteSubMenuBackendDialog(menubackendID, SubMenuBackend) {
    this.dialogRef = this.dialog.open(DialogDeleteSubMenuBackendMenuBackend, {
      height: '300px',
      width: '500px',
    });
    this.dialogRef.componentInstance.menubackendID = menubackendID;
    this.dialogRef.componentInstance.SubMenuBackend = SubMenuBackend;
  }

  createDialog(menubackendID, menubackendName) {
    this.dialogRef = this.dialog.open(DialogCreateMenuBackend, {
      height: '250px',
      width: '400px',
    });
    this.dialogRef.componentInstance.menubackendID = menubackendID;
    this.dialogRef.componentInstance.menubackendName = menubackendName;
  }
}


@Component({
  selector: 'app-menubackendcreate',
  templateUrl: 'menubackendcreate.component.html',
  styleUrls: ['../menubackend.component.scss']
})

export class DialogCreateMenuBackend {

  menubackends: FirebaseListObservable<any[]>;
  submenubackends: FirebaseListObservable<any[]>;

  menubackendID: any;
  menubackendName: any;
  form: FormGroup;

  mode = 'determinate';
  upload: any;

  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    private fb: FormBuilder,
    public db: AngularFireDatabase) {
    this.form = this.fb.group({
      submenubackends: ['', Validators.required]
    });
    this.menubackends = this.db.list('/menubackends');
    this.submenubackends = this.db.list('/submenubackends', {
      query: {
        orderByChild: "submenu_name"
      }
    });
  }

  create(menubackendID, menubackendName) {
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';
    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    var sdkDb = firebase.database().ref();
    var submenukey = sdkDb.push().key;
    let dataToSave = {};
    dataToSave["submenubackends/" + this.form.value.submenubackends + "/menubackends/" + menubackendID] = "true";
    sdkDb.update(dataToSave).then(
      val => {
        let dataToSave = {};
        dataToSave["menubackends/" + menubackendID + "/submenubackends/" + this.form.value.submenubackends] = "true";
        sdkDb.update(dataToSave).then(
          val => {
            this._service.html("Add Submenu in " + menubackendName + " Menu", 'info');
          },
          error => {
            this._service.html("Error add Submenu " + error, 'error');
          })
      },
      error => {
        console.log(error);
      }
    );
  }
}

@Component({
  selector: 'app-menubackenddelete',
  templateUrl: 'menubackenddelete.component.html',
  styleUrls: ['../menubackend.component.scss']
})

export class DialogDeleteMenuBackend {

  menubackends: FirebaseListObservable<any[]>;

  menubackendID: any;
  menubackendName: any;
  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    public db: AngularFireDatabase) {
    this.menubackends = this.db.list('/menubackends');
  }

  delete(menubackendID, menubackendName) {
    this.menubackends.remove(menubackendID).then(
      val => {
        this._service.html("Deleted Menu : " + menubackendName + " <i class='fa fa-check'></i>", 'error');
      },
      error => {
        this._service.html("Error deleted menu " + error);
      }
    );
  }
}

@Component({
  selector: 'app-submenubackenddelete',
  templateUrl: 'submenubackenddelete.component.html',
  styleUrls: ['../menubackend.component.scss']
})

export class DialogDeleteSubMenuBackendMenuBackend {

  form: FormGroup;

  menubackendID: any;
  SubMenuBackend: any;
  menubackends: FirebaseListObservable<any[]>;
  submenubackends: FirebaseListObservable<any[]>;

  constructor(
    public _service: NotificationsService,
    public dialogRef: MdDialogRef<any>,
    private fb: FormBuilder,
    public db: AngularFireDatabase) {
    this.form = this.fb.group({
      submenu_key: [''],
      submenu_name: ['']
    });
    this.menubackends = this.db.list('/menubackends');
    this.submenubackends = this.db.list('/submenubackends');

  }

  delete(menubackendID, SubMenuBackend) {
    SubMenuBackend.subscribe(snapshot =>
      this.form.patchValue({
        submenu_key: snapshot.$key,
        submenu_name: snapshot.submenu_name
      })
    );
    var sdkDb = firebase.database().ref();
    let dataToSave = {};
    dataToSave["menubackends/" + menubackendID + "/submenubackends/" + this.form.value.submenu_key] = null;
    sdkDb.update(dataToSave).then(
      val => {
        let dataToSave = {};
        dataToSave["submenubackends/" + this.form.value.submenu_key + "/menubackends/" + menubackendID] = null;
        sdkDb.update(dataToSave).then(
          val => {
            this._service.html("Delete Submenu " + this.form.value.submenu_name + " in Menu", 'error');
          },
          error => {
            this._service.html("Error deleted Submenu " + error, 'error');
          })
      },
      error => {
        console.log(error);
      }
    );
  }
}
