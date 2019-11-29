import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Barcode } from './barcode.model';

@Pipe({
  name: 'BarcodeFilter'
})
export class BarcodeFilter implements PipeTransform {

  transform(value: Barcode[], q: string) {
    if (value == null) {
      return null;
    }
    if (!q || q === '') {
      return value;
    }
    return value.filter(value => -1 < value.barcode_name.toLowerCase().indexOf(q.toLowerCase()));
  }
}
