import { EventEmitter, Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-barcodecreate',
  templateUrl: './barcodecreate.component.html',
  styleUrls: ['../barcode.component.scss']
})
export class BarcodeCreateComponent implements OnInit {

  Action = "Create";
  Icon = "code";

  barcode: FormGroup;
  form: FormGroup;

  mode = 'determinate';
  upload: any;

  createdCode = null;

  barcodes: FirebaseListObservable<any[]>;
  
  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private router: Router,
    public db: AngularFireDatabase
  ) {
    this.barcode = this.fb.group({
      barcode_id: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    });
    this.form = this.fb.group({
      barcode_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(1000)]]
    });
    this.files = []; 
    this.uploadInput = new EventEmitter<UploadInput>(); 
    this.humanizeBytes = humanizeBytes;
  }

  getTitle() {
    return this._componentPageTitle.title;
  }

  ngOnInit() {
    this._componentPageTitle.title = 'Barcode';

    this.barcodes = this.db.list('/barcodes');
  }

  createCode() {
    this.createdCode = this.barcode.value.barcode_id;
  }

  disabled:any='';
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  fileName:any='';
  checkdone:any='';

  check() {
    this.checkdone = "true";
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      this.fileName = selectedFile.name;
    } 
  }
  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') { 

    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); 
    } else if (output.type === 'uploading') {
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { 
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') { 
      this.dragOver = false;
    }
  }

  save(size) {
  this.disabled="true";
  let storageRef = firebase.storage().ref();
  for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {

    this.upload = 'Please wait...';
    this.mode = 'indeterminate';

    const newBarcodeKey = firebase.database().ref('barcodes/').push().key;
    let fullPath = `/barcodes/barcode/${newBarcodeKey}/${selectedFile.name}`;
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
      this.barcodes.update(newBarcodeKey, {
        barcode_id: this.barcode.value.barcode_id,
        barcode_name: this.form.value.barcode_name,
        barcode_created: timestamp,
        barcode_updated: timestamp,
        barcode: {
          size: size,
          fileName: iRef.name,
          fullPath: iRef.fullPath,
          downloadURL: uploadTask.snapshot.downloadURL
        }
      }).then(
        val => {
          this.router.navigate(['/admin/barcode']);
        },
        error => {
          console.log(error);
        }
        );
    });
    }
  }

  reset() {
    this.barcode.reset();
    this.form.reset();
    this.createdCode = null;
    this.checkdone = '';
    this.files = []; 
    this.fileName = '';
    this.uploadInput = new EventEmitter<UploadInput>(); 
    this.humanizeBytes = humanizeBytes;
  }
}
