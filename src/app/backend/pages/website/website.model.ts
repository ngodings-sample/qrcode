import {Observable} from "rxjs/Rx";
export class Website {
  constructor(
    public $key: string,
    public website_name: string,
    public website_author: string,
    public website_logo: {
      fullPath: string,
      filename: string,
      downloadURL: string
    },
    public website_facebook: string,
    public website_twitter: string,
    public website_instagram: string,
    public website_youtube: string,
    public website_phonenumber: string,
    public website_address: string,
    public website_created: number,
    public website_post: string,
    public website_updated: string
  ) {
  }
}
