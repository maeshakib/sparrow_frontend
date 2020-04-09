import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class AttendanceService {

    constructor(private http: HttpClient, private utilService: UtilService) { }


    saveHolidays(data_json) {     
        const data = {  holidays: data_json    }
        const newObj =data;
       const options = this.utilService.httpClientHeaderOptions();
       const uri = `${apiUri}/insert_holidays`;

       return this.http.post(uri, newObj, options);
    }

    updateHolidays(data_json,first,last) {         
       var ojb = {from_date : first, to_date:last,holidays: data_json};    
       const options = this.utilService.httpClientHeaderOptions();
       const uri = `${apiUri}/update_holidays`;

       return this.http.post(uri, ojb, options);
    }
}