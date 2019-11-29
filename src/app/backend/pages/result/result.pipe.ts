import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Result } from './result.model';

@Pipe({
  name: 'ResultFilter'
})
export class ResultFilter implements PipeTransform {

  transform(value: Result[], q: string) {
    if (value == null) {
      return null;
    }
    if (!q || q === '') {
      return value;
    }
    return value.filter(value => -1 < value.barcode_id.toLowerCase().indexOf(q.toLowerCase()));
  }
}
