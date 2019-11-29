import {Observable} from "rxjs/Rx";
export class Barcode {

  constructor(
    public $key: string,
    public barcode_id: string,
    public barcode_name: string
  ) {
  }
}
