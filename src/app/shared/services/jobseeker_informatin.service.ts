import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable({providedIn: 'root'}  )

export class JobseekerInformationService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getPersonalDetails() {
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/personal-details`;

        return this.http.get(uri, options);
    }
  
    
     
     getSinglePersonalDetails(id) {
       // console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/personal-details/${id}`;

        return this.http.get(uri, options);
    }



  
  
    updatePersonalDetails(data, id) {
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/personal-details/${id}`;
        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }

// //PersonalDetails start here
savePersonalDetails(data) {

    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/personal-details`; 
    const formData: FormData = new FormData();     
     Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return this.http.post(uri, formData, options); 
  
}

//PersonalDetails end here




uploadAttachment(data, userImage?) {
    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/file-upload/${data.user_id}`;
    const formData: FormData = new FormData();
    formData.append('p11form', userImage, userImage.name);

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    formData.append('_method', 'put');
     return this.http.post(uri, formData, options);
 
}


uploadAttachmentPhoto(data, userImage?) {
    const options = this.utilService.httpClientHeaderOptionsImage();
    const uri = `${apiUri}/photo-upload/${data.user_id}`;
    const formData: FormData = new FormData();
    formData.append('coverLetter', userImage, userImage.name);

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    formData.append('_method', 'put');
     return this.http.post(uri, formData, options);
 
}



}