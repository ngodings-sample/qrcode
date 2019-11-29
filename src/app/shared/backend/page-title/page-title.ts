import { Injectable } from '@angular/core';

@Injectable()
export class ComponentPageTitle {
  _title: string = '';

  get title(): string { return this._title; }
  set title(title: string) { this._title = title; }
}
