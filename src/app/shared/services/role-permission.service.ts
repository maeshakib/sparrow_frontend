import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable()

export class RolePermissionService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getRoles() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/roles`;

        return this.http.get(uri, options);
    }
    getRole(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/roles/${id}/edit`;

        return this.http.get(uri, options);
    }
    getPermissions() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/roles/create`;

        return this.http.get(uri, options);
    }
    saveRolePermission(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/roles`;

        return this.http.post(uri, data, options);
    }
    updateRolePermission(data, id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/roles/${id}`;

        return this.http.put(uri, data, options);
    }
    deleteRolePermission(id, replaceableRoleId) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/role/${id}`;

        const data = {
            role_id: replaceableRoleId
        }

        return this.http.post(uri, data, options);
    }
    checkExistingRole(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/check-role`;

        return this.http.post(uri, data, options);
    }
    getToken(){
        return localStorage.getItem('accessToken');
    }
}
