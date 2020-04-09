import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class DesignationService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllDesignation() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/designation`;

        return this.http.get(uri, options);
    }
    saveDesignation(data) {
        // console.log(data);
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/designation`; 
         const formData: FormData = new FormData();     
          Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options); 
       
     }

     getDesignation(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/designation/${id}`;

        return this.http.get(uri, options);
    }
 


    updateDesignation(data, id) {
     
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/designation/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }
}