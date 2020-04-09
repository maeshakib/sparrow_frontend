import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class JobPostService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllPostedJobs() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/job-post`;

        return this.http.get(uri, options);
    }
    getAllJobs() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/all-jobs`;

        return this.http.get(uri, options);
    }
//to show single job details
    getSingleJobs(id) {
        // console.log(id);
         const options = this.utilService.httpClientHeaderOptions();
         const uri = `${apiUri}/single-job/${id}`;
 
         return this.http.get(uri, options);
     } 

     getSingleJobAllCv(id) {
        // console.log(id);
         const options = this.utilService.httpClientHeaderOptions();
         const uri = `${apiUri}/job-cv/${id}`;
 
         return this.http.get(uri, options);
     } 

     getSingleJobShortlistCv(id) {
        // console.log(id);
         const options = this.utilService.httpClientHeaderOptions();
         const uri = `${apiUri}/job-cv-shortlist/${id}`;
 
         return this.http.get(uri, options);
     } 


     
     shortListUser(userId,jobId){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/short-list-user`;
        const data = {
            user_id: userId,
            job_id:jobId
        }
        return this.http.post(uri,data, options);
     }
    //  getSinglePersonalDetails(id) {
    //    // console.log(id);
    //     const options = this.utilService.httpClientHeaderOptions();
    //     const uri = `${apiUri}/personal-details/${id}`;

    //     return this.http.get(uri, options);
    // }



  
  
    // updatePersonalDetails(data, id) {
    //     const options = this.utilService.httpClientHeaderOptionsImage();
    //     const uri = `${apiUri}/personal-details/${id}`;
    //     const formData: FormData = new FormData();
       
    //     Object.keys(data).forEach(key => {
    //         formData.append(key, data[key]);
    //     });
    //     formData.append('_method', 'put');
    //     return this.http.post(uri, formData, options);
     
    // }

// //PersonalDetails start here
saveJobPost(data) {

    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/job-post`; 
    const formData: FormData = new FormData();     
     Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return this.http.post(uri, formData, options); 
  
}

downloadFile(file: String) {
    var body = { filename: file };

    return this.http.post(`${apiUri}/filedownload`, body, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
}



//PersonalDetails end here










}