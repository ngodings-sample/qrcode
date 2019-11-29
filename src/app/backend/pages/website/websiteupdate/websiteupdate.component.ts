import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentPageTitle } from '../../../../shared/backend/page-title/page-title';
import { CustomValidators } from 'ng2-validation';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-websiteupdate',
  templateUrl: './websiteupdate.component.html',
  styleUrls: ['../website.component.scss']
})
export class WebsiteUpdateComponent implements OnInit {

  Action = "Update";
  Icon = "desktop_windows";

  form: FormGroup;

  WebsiteName: string;
  websites: FirebaseListObservable<any[]>;

  mode = 'determinate';
  upload: any;

  constructor(
    private _componentPageTitle: ComponentPageTitle,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
      website_post: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      website_key: ['']
    });
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
            website_name: snapshot.val().website_name,
            website_author: snapshot.val().website_author,
            website_description: snapshot.val().website_description,
            website_keyword: snapshot.val().website_keyword,
            website_facebook: snapshot.val().website_facebook,
            website_github: snapshot.val().website_github,
            website_instagram: snapshot.val().website_instagram,
            website_youtube: snapshot.val().website_youtube,
            website_phonenumber: snapshot.val().website_phonenumber,
            website_address: snapshot.val().website_address,
            website_post: snapshot.val().website_post
          });
        })
      })
  }




  disabled: any = '';
  save() {
    this.disabled = "true";
    this.upload = 'Please wait...';
    this.mode = 'indeterminate';

    var timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.websites.update(this.form.value.website_key, {
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
      website_updated: timestamp,
      website_post: this.form.value.website_post
    }).then(
      val => {
        this.router.navigate(['/admin/website']);
      },
      error => {
        console.log(error);
      }
      );
  }

  reset() {
    this.form.reset();
  }

}
