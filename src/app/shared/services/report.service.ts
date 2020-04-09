import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class ReportService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    getSalesCollectionReport(date) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/mio_activity`;
        
        const data = {
            from_date: `${date.fecha.year}-${date.fecha.month}-01`
        }

        return this.http.post(uri, data, options);
    }
    
    getFarmers(leveId?) {
        const options = this.utilService.httpClientHeaderOptions();
        let uri;
        if (leveId !== undefined) {
            uri = `${apiUri}/farmer_list/1/${leveId}`;
        } else{
            uri = `${apiUri}/farmer_list`;
        }

        return this.http.get(uri, options);
    }
    getAllSprints(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/all-saao-report`;

        return this.http.post(uri, data, options);
    }
    getAllSchedule(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/all-schedule`;

        return this.http.post(uri, data, options);
    }
    getSingleAttandanceReport() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/checkin_history`;

        return this.http.get(uri, options);
    }
    getDateWiseAttandance(data){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/user_activity_monitor`;

        return this.http.post(uri, data, options);
    }
    
   //get all broadcast data based on date range
    getAllBroadcastData(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/get_broadcasts`;

        return this.http.get(uri, options);
    }

    //get all broadcast data based on date range
    getAllArchivedBroadcastData(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/get_broadcasts`;

        return this.http.post(uri,data, options);
    }
      //get single user leave balance data  
      getLeaveBalanceData(){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/my_leaves`;

        return this.http.get(uri, options);
    }

      //get single user leave history data  
      getLeaveHistoryData(){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/my_leave_history`;

        return this.http.get(uri, options);
    }


     //get Downstream leave approval data  
     getDownstreamLeaveApprovalData(){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/leave_waiting_for_approval`;

        return this.http.get(uri, options);
    }
     //get all leave type with amount
     getAllLeaveType(){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/leaves`;

        return this.http.get(uri, options);
    }

     //get all holidays data based on date range
     getAllHolidaysData(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/get_holidays`;

        return this.http.post(uri,data,options);
    }
     //get all sales data based on date range
     getAllSales(data?){
         console.log(data);
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/all-sales`;

        return this.http.post(uri,data,options);
    }
     //get all collections data based on date range
     getAllCollections(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/all-collections`;

        return this.http.post(uri,data,options);
    }
     //get all collections data based on date range
     getAmWiseSales(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/am-sales`;

        return this.http.post(uri,data,options);
    }
     //get all collections data based on date range
     getAmWiseCollections(data?){
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/am-collections`;

        return this.http.post(uri,data,options);
    }

    getlocationwithlevel() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/getlocationwithlevel`;

        return this.http.get(uri, options);
    }

    getLevelLocList(id) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/getlocationwithlevel/${id}`;

        return this.http.get(uri, options);
    }
}
