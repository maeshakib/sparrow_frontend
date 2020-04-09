import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class ResumeService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllReferences() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/reference`;

        return this.http.get(uri, options);
    }
  
    saveReference(data) {
         console.log(data);
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/reference`; 
         const formData: FormData = new FormData();     
          Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options); 
       
     }
  

     
     getReference(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/reference/${id}`;

        return this.http.get(uri, options);
    }



  
  
    updateReference(data, id) {
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/reference/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }

//education start here
saveEducation(data) {

    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/education`; 
    const formData: FormData = new FormData();     
     Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return this.http.post(uri, formData, options); 
  
}

//education end here










}