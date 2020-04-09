import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class DepartmentService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllDepartment() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/department`;

        return this.http.get(uri, options);
    }
  
    saveDepartment(data) {
        // console.log(data);
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/department`; 
         const formData: FormData = new FormData();     
          Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options); 
       
     }

     
     getDepartment(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/department/${id}`;

        return this.http.get(uri, options);
    }
     updateDepartment(data, id) {
     
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/department/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }
}