import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class AppliedJobService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllAppliedJobs() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/applied-jobs`;

        return this.http.get(uri, options);
    }
  
    
    applyJobPost(data,id) {

        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/applied-jobs/${id}`; 

        const formData: FormData = new FormData();     
         Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
    
        return this.http.post(uri, formData, options); 
      
    }
     








}