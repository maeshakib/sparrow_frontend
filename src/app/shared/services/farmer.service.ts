import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class FarmerService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    ChangeFarmerStatus(status, mobile_no) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/dae/farmer_update`;

        const data = {
            status: status,
            mobile_no: mobile_no
        }
        return this.http.post(uri, data, options);
    }

}

