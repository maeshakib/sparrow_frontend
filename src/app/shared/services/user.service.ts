import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class UserService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllUser() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/user-list`;
        const data = {
            status: 2,
        }
        return this.http.post(uri,data, options);
    }
    getAllsupervisors() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/user-list`;
      
        return this.http.get(uri, options);
    }
    getRegisterData() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/create-user`;

        return this.http.get(uri, options);
    }
    saveUser(data, userImage?) {
        console.log(data);
        if (userImage) {
            const options = this.utilService.httpClientHeaderOptionsImage();
            const uri = `${apiUri}/create-user`;

            const formData: FormData = new FormData();
            formData.append('photo', userImage, userImage.name);

            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            return this.http.post(uri, formData, options);
        } else {
            const options = this.utilService.httpClientHeaderOptions();
            const uri = `${apiUri}/create-user`;

            const formData: FormData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            return this.http.post(uri, formData, options);
        }
    }
    getUser(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/user-edit/${id}`;

        return this.http.get(uri, options);
    }
    getLoggedUserDetails() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/myprofile`;

        return this.http.get(uri, options);
    }
    updateUserProfile(data) {
        console.log(data);

        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/profile/update`;
      
        const formData: FormData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });



        return this.http.post(uri, formData, options);
    }
    updateUser(data, id, userImage?) {
        data["join_date"] = `${data["format_join_date"].year}-${data["format_join_date"].month}-${data["format_join_date"].day}`;

        if (userImage) {
            const options = this.utilService.httpClientHeaderOptionsImage();
            const uri = `${apiUri}/user-edit/${id}`;

            const formData: FormData = new FormData();
            formData.append('photo', userImage, userImage.name);

            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            // formData.append('_method', 'put');
            return this.http.post(uri, formData, options);
        } else {
            const options = this.utilService.httpClientHeaderOptions();
            const uri = `${apiUri}/user-edit/${id}`;

            const formData: FormData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            // formData.append('_method', 'put');
            return this.http.post(uri, formData, options);
        }
    }
    deleteUser(id,repID) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/delete-user/${id}`;
        const data = {
            user_id: repID
        }
        return this.http.post(uri,data, options);
    }
    getLevelLocList(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/getlocationwithlevel/${id}`;

        return this.http.get(uri, options);
    }
    getUserPermission() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/user-permissions-list`;

        return this.http.get(uri, options);
    }
}
