import { Component, OnInit, EventEmitter } from '@angular/core';
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from 'ng2-validation';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
@Component({
  selector: 'app-websitecreate',
  templateUrl: './websitecreate.component.html',
  styleUrls: ['../website.component.scss']
})
export class WebsiteCreateComponent implements OnInit {

  Action = "Create";
  Icon = "desktop_windows";

  form: FormGroup;

  websites: FirebaseListObservable<any[]>;

  mode = 'determinate';
  upload: any;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private router: Router,
    public db: AngularFireDatabase) {
    this.form = this.fb.group({
      website_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      website_author: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      website_description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      website_keyword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      website_facebook: ['', [Validators.required, CustomValidators.url, Validators.maxLength(50)]],
      website_github: ['', [Validators.required, CustomValidators.url, Validators.maxLength(50)]],
      website_instagram: ['', [Validators.required, CustomValidators.url, Validators.maxLength(50)]],
      website_youtube: ['', [Validators.required, CustomValidators.url, Validators.maxLength(100)]],
      website_phonenumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(50)]],
      website_address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      website_post: ['', [Validators.required]]
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

    this.websites = this.db.list('/websites');
  }


  disabled: any = '';
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  fileName: any = '';
  checkdone: any = '';
  check() {
  this.checkdone = "true";
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
    this.disabled = "true";
    let storageRef = firebase.storage().ref();
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {

      this.upload = 'Please wait...';
      this.mode = 'indeterminate';

      const newWebsiteKey = firebase.database().ref('websites/').push().key;
      let fullPath = `/websites/website_logo/${newWebsiteKey}/${selectedFile.name}`;
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
        this.websites.update(newWebsiteKey, {
          website_name: this.form.value.website_name,
          website_author: this.form.value.website_author.toLowerCase(),
          website_description: this.form.value.website_description.toLowerCase(),
          website_keyword: this.form.value.website_keyword.toLowerCase(),
          website_facebook: this.form.value.website_facebook,
          website_github: this.form.value.website_github,
          website_instagram: this.form.value.website_instagram,
          website_youtube: this.form.value.website_youtube,
          website_phonenumber: this.form.value.website_phonenumber,
          website_address: this.form.value.website_address.toLowerCase(),
          website_post: this.form.value.website_post,
          website_created: timestamp,
          website_updated: timestamp,
          website_logo: {
            size: size,
            fileName: iRef.name,
            fullPath: iRef.fullPath,
            downloadURL: uploadTask.snapshot.downloadURL
          }
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

  reset() {
    this.form.reset();
  }
}
