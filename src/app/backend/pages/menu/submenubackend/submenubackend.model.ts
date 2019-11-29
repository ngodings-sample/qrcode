import {Observable} from "rxjs/Rx";
export class SubMenuBackend {

  constructor(
    public $key: string,
    public submenu_name: string,
    public submenu_icon: string,
    public submenu_url: string,
    public submenu_created: string,
    public submenu_updated: string,
    public menubackendsId: string,
    public menubackends: {}
  ) {
  }
}
