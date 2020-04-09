import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable({providedIn: 'root'}  )

export class IrrigationService {
    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllIrrigationResourceData() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/irrigations`;

        return this.http.get(uri, options);
    }

    deleteIrrigationResource(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/irrigations/${id}`;

        return this.http.delete(uri, options);
    }

    getSingleIrrigationData(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/irrigations/${id}`;

        return this.http.get(uri, options);
    }

    
    saveIrrigationResource(data, userImage?) {
        // console.log(data);
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/irrigations`;
 
         const formData: FormData = new FormData();
         if (userImage) 
         {       
             formData.append('image', userImage, userImage.name);     
         }  
      
         Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options);
 
 
       
     }
     
 



} //end class