import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class TrainingService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllTrainingDetails() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/training`;

        return this.http.get(uri, options);
    }
  
    
     
     getTrainingDetails(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/training/${id}`;

        return this.http.get(uri, options);
    }



  
  
    updateTrainingDetails(data, id) {
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/training/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }

//education start here
saveTraining(data) {
console.log(data);
    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/training`; 
    const formData: FormData = new FormData();     
     Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return this.http.post(uri, formData, options); 
  
}

//education end here










}