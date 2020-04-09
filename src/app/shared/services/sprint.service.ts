import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;
import { map } from 'rxjs/operators';

@Injectable()

export class SprintService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getAllSprints() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/sprints`;

        return this.http.get(uri, options);
    }
    getSingleSchedule(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules/${id}`

        return this.http.get(uri,options);
    }
    //get single schedule multiple event
    getSchedule(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/edit-schedule-events/${id}`

        return this.http.get(uri,options);
    }
    getSprintSchedules() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/sprint-schedules/`;

        return this.http.get(uri,options);
    }
    getEvents(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedule-events/${id}`;

        return this.http.get(uri,options);
    }
    getEvent(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/events/${id}`;

        return this.http.get(uri,options);
    }
    //all group list
    getGroupList(){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules/create`;

        return this.http.get(uri,options);
    }
    updateSchedule(id){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/sprints/${id}`;
        const data = {}
        return this.http.put(uri,data,options);
    }
    saveSprint(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/sprints`;

        return this.http.post(uri, data, options);
    }
    saveSchedule(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules`;

        return this.http.post(uri, data, options);
    }
    saveEvent(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/events`;

        return this.http.post(uri, data, options);
    }
    updateEvent(data,id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/events/${id}`;

        return this.http.put(uri, data, options);
    }
    updateSprint(data,id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/sprints/${id}`;

        return this.http.put(uri, data, options);
    }
    updateSingleSchedule(data,id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules/${id}`;

        return this.http.put(uri, data, options);
    }
    deleteSprint(id){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/sprints/${id}`;

        return this.http.delete(uri,options);
    }
    deleteSchedule(id){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules/${id}`;

        return this.http.delete(uri,options);
    }
    //ok
    deleteEvent(id){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/events/${id}`;

        return this.http.delete(uri,options);
    }
    approvedSingleSchedule(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/update-single-schedule/${id}`;

        return this.http.put(uri,options);
    }
    getSAAOScheduleList(){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/schedules/`;

        return this.http.get(uri,options);
    }


}
