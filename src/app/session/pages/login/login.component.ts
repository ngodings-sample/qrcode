import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  form: FormGroup;
  error: any;

  constructor(
    public _service: NotificationsService,
    public afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    });
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/admin');
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
      .then((user) => {
        this._service.html("Anda Telah Masuk", 'success');
        this.router.navigateByUrl('/admin');
        error => {
          this._service.html("Gagal Masuk", 'error');
        }
      }).catch(
      (err) => {
        this._service.html("Username dan Password salah", 'error');
      });
  }

  ngOnInit() { }

  get valid() {
    return this.form.valid;
  }
}
