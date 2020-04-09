import { Injectable } from '@angular/core';
// import { Headers, Http, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { JwtHelper } from 'angular2-jwt';

import { UtilService } from '../services/util.service';

const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()
export class AuthService {
  private serverPath = ServerBasePath.serverPath;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private httpClient: HttpClient, private router: Router, private utilService: UtilService) { }

  public options = this.utilService.httpLoginHeaderOptions();
  /* Method for token request from server
  * @Parameter AuthData means Username & password
  * @Return Boolean
  */
  login(authData) {
    // const body = 'username=' + data.username + '&password=' + data.password + '&grant_type=password';
    const uri = `${apiUri}/login`;
    const body = {
      grant_type: 'password',
      email: authData.Email,
      password: authData.Password
    };
    console.log(body);
    // return this.http.post(this.serverPath + '/token', body, {headers: this.contentHeaders()}).map((res) => {
    return this.httpClient.post(uri, body, this.options);
  }

  /* Method for logout and remove token
  * @Parameter No parameter
  * @Return Boolean
  */

  /* Method for registration in the system
  * @Parameter No parameter
  * @Return Boolean
  */
  registration(data: any) {
    // return this.http.post(this.serverPath + '/api/account/registration', data);
    // alert(JSON.stringify(data));
    // const headers = new Headers();
    // headers.append('X-localization', this.langChange.langChange());
    // const options = new RequestOptions({ headers: headers });
    const registrationData = {
      name: data.Name,
      email: data.Email,
      mobile_no: data.mobile_no,
      gender: data.gender,
      password: data.Password,
      password_confirmation: data.ConfirmPassword,
    };
    const uri = `${apiUri}/sign-up`;
    return this.httpClient.post(uri, registrationData);
  }

  /* Method for request reset password when forgot password
  * @Parameter user email
  * @Return Response string
  */
  //   forgotPassword(data) {
  //     return this.http.post(this.serverPath + '/api/password/reset', data).map(response => response.json());
  //   }

  /* Method for Reset password
  * @Parameter email, new password, confirm password
  * @Return Response string
  */
  //   resetPassword(data, param) {
  //     return this.http.put(this.serverPath + `/api/password/reset/${param.token}`, data).map(response => response.json());
  //   }

  /* Method for Checked that claimed user is authenticate or not ?
  * @Parameter No parameter
  * @Return Boolean
  */
  checkLogged() {
    console.log('i am in checkLogged');
    console.log(localStorage.getItem('accessToken'));
    if (!localStorage.getItem('accessToken'))
    {
       return true;
    }else{
      const token: string = localStorage.getItem('accessToken');
      const isExpired: boolean = this.jwtHelper.isTokenExpired(token);
      console.log('isTokenExpired :' + isExpired);
      return isExpired;
  }
}
  logout() {
    localStorage.removeItem('access_token');
    console.log('i am in logout');

    return true;
  }


  resetPassword(data: any) {

    const registrationData = {
       email: data.Email,     
    };
    const uri = `${apiUri}/send`;
    return this.httpClient.post(uri, registrationData);
  }

  /* Method for get the logged user name
  * @Parameter No parameter
  * @Return string
  */
  // getLoggedUsername () {
  //   if (localStorage.getItem('accessToken')) {
  //     const token = localStorage.getItem('accessToken');
  //     const tokenDecode = this.jwtHelper.decodeToken(token);
  //     // return tokenDecode['unique_name'];
  //     return tokenDecode['name'];
  //   }

  //   return null;
  // }

  // getLoggedUsertype () {
  //   if (localStorage.getItem('accessToken')) {
  //     const token = localStorage.getItem('accessToken');
  //     const tokenDecode = this.jwtHelper.decodeToken(token);
  //     // return tokenDecode['unique_name'];
  //     return tokenDecode['user_type'];
  //   }

  //   return null;
  // }

  // getLoggedEmail () {
  //   if (localStorage.getItem('accessToken')) {
  //     const token = localStorage.getItem('accessToken');
  //     const tokenDecode = this.jwtHelper.decodeToken(token);
  //     return tokenDecode['email'];
  //   }

  //   return null;
  // }
}
