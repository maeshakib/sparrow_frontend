import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class DrawService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getLevels() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/location_levels`;

        return this.http.get(uri, options);
    }

    getLevel(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/getlevels/${id}`;

        return this.http.get(uri, options);
    }

    getLevelList(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/getLevelwiseLocation/${id}`;

        return this.http.get(uri, options);
    }

    getLocation(id?) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = id !== undefined ? `${apiUri}/getlocation/${id}` : `${apiUri}/getlocation`;

        return this.http.get(uri, options);
    }

    saveLocation(data, fileToUpload) {
        if (fileToUpload) {
            const options = this.utilService.httpClientHeaderOptionsImage();
            const uri = `${apiUri}/locations`;
            
            const formData: FormData = new FormData();
            formData.append('kmlfile', fileToUpload, fileToUpload.name);

            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            return this.http.post(uri, formData, options);
        } else {
            const options = this.utilService.httpClientHeaderOptions();
            const uri = `${apiUri}/locations`;

            const formData: FormData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            return this.http.post(uri, formData, options);
        }
    }
    updateLocation(data, id, fileToUpload?) {
        const options = this.utilService.httpClientHeaderOptionsImage();
        const uri = `${apiUri}/locations/${id}`;

        const formData: FormData = new FormData();
        formData.append('kmlfile', fileToUpload, fileToUpload.name);

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        formData.append('_method', 'put');

        return this.http.post(uri, formData, options);
    }
    getSelectedLocationArea(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/location_parents/${id}`;

        return this.http.get(uri, options);
    }

    deleteLocationArea(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/locations/${id}`;

        return this.http.delete(uri, options);
    }
}

