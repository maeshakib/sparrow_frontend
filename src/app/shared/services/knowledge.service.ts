import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class KnowledgeService {

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
    getKnowledge(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/knowledge/${id}`;

        return this.http.get(uri);
    }
    saveCategory(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categoryapi`;

        return this.http.post(uri, data, options);
    }
    deleteKnowledgeCategory(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/categoryapi/${id}`;

        return this.http.delete(uri, options);
    }
    saveKnowledge(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/knowledge`;

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
    getKnowledges() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/knowledge`;

        return this.http.get(uri, options);
    }
    deleteKnowledge(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/knowledge/${id}`;

        return this.http.delete(uri, options);
    }
    updateKnowledge(data, id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/knowledge/${id}`;

        return this.http.put(uri, data, options);
    }
    getSchedule(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules/${id}`

        return this.http.get(uri), options;
    }

    getSuggestedKnowledge(word) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/knowledge_suggestions`;

        const data = {
            key: word
        }
        return this.http.post(uri, data, options);
    }
}
