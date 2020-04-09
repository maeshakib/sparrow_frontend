import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class ProblemService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getCategories() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categoryapi`;

        return this.http.get(uri, options);
    }
    getPeginatedDate(url) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = url;
        return this.http.get(uri, options);
    }
    getCategory(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categoryapi/${id}`;

        return this.http.get(uri, options);
    }
    getfarmers_problems(id,mobileNo) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/farmer_problem_show/${id}`;
        const data = {
            mobile_no: mobileNo
        }
        return this.http.post(uri,data,options);
    }
    saveCategory(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categoryapi`;

        return this.http.post(uri, data, options);
    }
    saveProblems(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/farmers_problems`;

        return this.http.post(uri, data, options);
    }
    updateCategory(data, id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categoryapi/${id}`;

        return this.http.put(uri, data, options);
    }
    getCategoryList() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categorylist`;

        return this.http.get(uri, options);
    }
    getProblems() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/farmer_problem_list`;

        return this.http.get(uri,options);
    }
    deleteProblem(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/farmers_problems/${id}`;

        return this.http.delete(uri,options);
    }
    updatefarmers_problems(data, id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/farmer_problem_update/${id}`;

        return this.http.put(uri, data, options);
    }
    getSchedule(id) {
        const uri = `${apiUri}/schedules/${id}`

        return this.http.get(uri);
    }

    getSuggestedProblem(word) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/problem_suggestions`;

        const data = {
            key: word
        }
        return this.http.post(uri, data);
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }
}
