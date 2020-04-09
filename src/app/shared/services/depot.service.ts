import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class DepotService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllDepot() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/depot`;

        return this.http.get(uri, options);
    }
  
    saveDepot(data) {
        // console.log(data);
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/depot`; 
         const formData: FormData = new FormData();     
          Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options); 
       
     }

     
     getDepot(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/depot/${id}`;

        return this.http.get(uri, options);
    }
     updateDepot(data, id) {
     
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/depot/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }
}