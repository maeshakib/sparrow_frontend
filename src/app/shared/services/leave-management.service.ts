import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;


@Injectable(  { providedIn: 'root'})

export class LeaveManagementService {

    constructor(private http: HttpClient, private utilService: UtilService) { }


   

    getLeaveSetupType(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/leaves/${id}`;

        return this.http.get(uri, options);
    }

  
    saveLeaveApplication(data) {
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/leave_application`;
 
         const formData: FormData = new FormData();
       
         Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options);
       
     }

    saveLeaveSetup(data) {
         const options = this.utilService.httpClientHeaderOptionsImage();
         const uri = `${apiUri}/leaves`;
 
         const formData: FormData = new FormData();
       
         Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
 
         return this.http.post(uri, formData, options);
       
     }
     approveDownstreamLeave(data, id) {
         const options = this.utilService.httpClientHeaderOptionsImage();         
         const uri = `${apiUri}/leave_application_update/${id}`;
         const formData: FormData = new FormData();       
         Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });
        // formData.append('_method', 'put');
         return this.http.post(uri, formData, options);
       
     }

     


     deleteSingleLeaveType(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/leaves/${id}`;

        return this.http.delete(uri, options);
    }


    deleteSingleLeaveApplication(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/my_leaves/delete/${id}`;

        return this.http.delete(uri, options);
    }

    updateLeaveSetupType(data, id) {
     
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/leaves/${id}`;

        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }

    updateUserLeaveApplication(data, id) {
     
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/my_leaves/update/${id}`;

        const formData: FormData = new FormData();
       
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
       // formData.append('_method', 'put');
        return this.http.post(uri, formData, options);
     
    }

    recurringSingleYearLeave() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/update_all_recurring_leave`;

        return this.http.get(uri, options);
    }


}// end broadcast class