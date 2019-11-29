import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';
import { CustomValidators } from 'ng2-validation';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-websiteupdateimage',
  templateUrl: './websiteupdateimage.component.html',
  styleUrls: ['../website.component.scss']
})
export class WebsiteUpdateImageComponent implements OnInit {

  Action = "Update";
  Icon = "desktop_windows";

  form: FormGroup;

  WebsiteName: string;
  websites: FirebaseListObservable<any[]>;

  mode = 'determinate';
  upload: any;

  downloadURL: any;
  filesName: any;
  fullPath: any;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public db: AngularFireDatabase) {
    this.form = this.fb.group({
      downloadURL: [''],
      fileName: [''],
      fullPath: [''],
      website_key: ['']
    });
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Website Information';

    this.WebsiteName = this.route.snapshot.params['id'];

    this.websites = this.db.list('/websites', {
      query: {
        orderByChild: "website_name",
        equalTo: this.WebsiteName,
        limitToLast: 1
      }
    });

    this.db.list('/websites', {
      query: {
        orderByChild: "website_name",
        equalTo: this.WebsiteName
      }, preserveSnapshot: true
    })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.form.patchValue({
            website_key: snapshot.key,
            downloadURL: snapshot.val().website_logo.downloadURL,
            fileName: snapshot.val().website_logo.fileName,
            fullPath: snapshot.val().website_logo.fullPath
          });

          this.downloadURL = this.form.value.downloadURL;
          this.filesName = this.form.value.fileName;
          this.fullPath = this.form.value.fullPath;
        })
      })


  }
  disabled:any='';
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  fileName:any='';
  checkdone:any='';
  check() {this.checkdone = "true";
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
  this.fileName = selectedFile.name;
  }
  }
  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    }
  }
  save(size) {
    this.disabled="true";
    let storageRef = firebase.storage().ref();

    let storagePath = this.form.value.fullPath;

    firebase.storage().ref().child(storagePath).delete();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {

      this.upload = 'Please wait...';
      this.mode = 'indeterminate';

      let fullPath = `/websites/website_logo/${this.form.value.website_key}/${selectedFile.name}`;
      var iRef = storageRef.child(fullPath);
      var uploadTask = iRef.put(selectedFile);

      uploadTask.on('state_changed', function(snapshot) {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
        }
      }, function(error) {
        console.log(error)
      }, () => {
        var timestamp = firebase.database.ServerValue.TIMESTAMP;
        this.websites.update(this.form.value.website_key, {
          website_logo: {
            size: size,
            fileName: iRef.name,
            fullPath: iRef.fullPath,
            downloadURL: uploadTask.snapshot.downloadURL
          },
          website_updated: timestamp
        }).then(
          val => {
            this.router.navigate(['/admin/website']);
          },
          error => {
            console.log(error);
          }
          );
      });
    }
  }
}
