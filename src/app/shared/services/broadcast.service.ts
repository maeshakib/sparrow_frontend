import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable()

export class BroadcastService {

    constructor(private http: HttpClient, private utilService: UtilService) { }


    saveBroadcast(data, userImage?,fileToUpload_video?,fileToUpload_audio? ) {
       // console.log(data);
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/broadcasts`;

        const formData: FormData = new FormData();
        if (userImage) 
        {       
            formData.append('image', userImage, userImage.name);     
        }
       if(fileToUpload_video)
       {
        formData.append('video', fileToUpload_video, fileToUpload_video.name);        
       }
       if(fileToUpload_audio)
       {
        formData.append('audio', fileToUpload_audio, fileToUpload_audio.name);
       }

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return this.http.post(uri, formData, options);


      
    }

    getBroadcast(id) {
        console.log(id);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/broadcasts/${id}`;

        return this.http.get(uri, options);
    }

    deleteSingleBroadcast(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/broadcasts/${id}`;

        return this.http.delete(uri, options);
    }



    updateBroadcast(data, id, userImage?,fileToUpload_video?,fileToUpload_audio?) {
     
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/broadcasts/${id}`;

        const formData: FormData = new FormData();
        if(userImage){
            formData.append('image', userImage, userImage.name);
        }
        if(fileToUpload_video){
            formData.append('video', fileToUpload_video, fileToUpload_video.name);
        }
        if(fileToUpload_audio){
             
            formData.append('audio', fileToUpload_audio, fileToUpload_audio.name);
        }
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
       // formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }


}// end broadcast class