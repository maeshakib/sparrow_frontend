import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class WorkExperienceService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllWorkExperience() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/work-experience`;

        return this.http.get(uri, options);
    }
  
    
     
     getWorkExperience(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/work-experience/${id}`;

        return this.http.get(uri, options);
    }



  
  
    updateWorkExperience(data, id) {
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/work-experience/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }

//education start here
saveWorkExperience(data) {

    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/work-experience`; 
    const formData: FormData = new FormData();     
     Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return this.http.post(uri, formData, options); 
  
}

//education end here










}