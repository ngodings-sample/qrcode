import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { SubMenuBackend } from './submenubackend.model';

@Pipe({
  name: 'SubMenuBackendFilter'
})
export class SubMenuBackendFilter implements PipeTransform {

  transform(value: SubMenuBackend[], q: string) {
    if (value == null) {
      return null;
    }
    if (!q || q === '') {
      return value;
    }
    return value.filter(value => -1 < value.submenu_name.toLowerCase().indexOf(q.toLowerCase()));
  }
}
