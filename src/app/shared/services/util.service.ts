import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UtilService {

  constructor() { }

  httpClientHeaderOptions = () => {
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json ');
    headers = headers.set('authorization', 'Bearer ' + this.getToken());
    const options = { headers: headers };

    return options;
  }

  httpClientHeaderOptionsImage = () => {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('authorization', 'Bearer ' + this.getToken());
    const options = { headers: headers };

    return options;
  }

  httpLoginHeaderOptions = () => {
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json ');
    const options = { headers: headers };

    return options;
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
