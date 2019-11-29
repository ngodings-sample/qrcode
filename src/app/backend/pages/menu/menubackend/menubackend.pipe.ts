import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MenuBackend } from './menubackend.model';

@Pipe({
  name: 'MenuBackendFilter'
})
export class MenuBackendFilter implements PipeTransform {

  transform(value: MenuBackend[], q: string) {
    if (value == null) {
      return null;
    }
    if (!q || q === '') {
      return value;
    }
    return value.filter(value => -1 < value.menu_name.toLowerCase().indexOf(q.toLowerCase()));
  }
}
