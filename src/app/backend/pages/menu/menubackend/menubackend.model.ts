import {Observable} from "rxjs/Rx";
export class MenuBackend {
  constructor(
    public $key: string,
    public menu_name: string,
    public menu_created: string,
    public menu_updated: string,
    public submenubackends: {},
  ) { }
}
