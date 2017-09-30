import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { HttpHelper } from '@rucken/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DemoHttpHelper extends HttpHelper {

  direct = environment.type === 'mockapi';

  constructor(public authHttp: AuthHttp, public http: Http) {
    super(authHttp, http);
  }
}
