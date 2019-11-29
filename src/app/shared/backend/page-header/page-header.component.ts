import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentPageTitle } from '../page-title/page-title';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor(
    private _componentPageTitle: ComponentPageTitle
  ) {

  }

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}
