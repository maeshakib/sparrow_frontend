import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerBasePath } from '../Server-Base-Path/server-path';
import { UtilService } from './util.service';
const apiUri = `${ServerBasePath.serverPath}/api`;

@Injectable()

export class InventoryService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    // inventory apis start
    getInventoryCount() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_count`;

        return this.http.get(uri, options);
    }
    // area stock apis start
    getAreaStockList() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_locationwise`;

        return this.http.get(uri, options);
    }
    receiveStock(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_receive_transfer/${id}`;

        return this.http.get(uri, options);

    }
    getCountyList(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/getLevelwiseLocation/${id}`;


        return this.http.get(uri, options);
    }
    stockTransfer(formData, locationId: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_transfer/${locationId}`;

        return this.http.post(uri, formData["items"], options);
    }
    stockDistribute(formData, user: object, userType: string) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = userType == 'user' ? `${apiUri}/stock_distribute/${user['id']}` : `${apiUri}/stock_distribute/0/${user['mobile_no']}`;

        return this.http.post(uri, formData["items"], options);
    }
    checkEmail(email) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_end_user_details/${email}`;

        return this.http.get(uri, options);
    }
    checkPhone(phone) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_end_user_details/${0}/${phone}`;

        return this.http.get(uri, options);

    }
    // purchase apis start
    getPurchaseItems() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/purchases`;

        return this.http.get(uri, options);

    }
    addPurchaseExistInfo() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/items_with_users`;

        return this.http.get(uri, options);
    }
    getPurchaseData(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/purchases/${id}`;

        return this.http.get(uri, options);
    }
    createPurchase(data) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/purchases`;

        return this.http.post(uri, data, options);
    }
    updatePurchase(data, purchaseId) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/purchases/${purchaseId}`;

        return this.http.put(uri, data, options);
    }
    deleteStock(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/purchase_stock_delete/${id}`;

        return this.http.delete(uri, options);
    }
    deletePurchase(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/purchases/${id}`;

        return this.http.delete(uri, options);
    }
    getItemsForMe() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_userwise`;

        return this.http.get(uri, options);
    }
    receiveItemForMe(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_receive_distribution/${id}`;

        return this.http.get(uri, options);
    }
    // transferred by me apis start
    getTransferredByMe() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_mytransfers`;

        return this.http.get(uri, options);
    }
    updateTransDistriByMe(data, id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_update_transfer/${id}`;

        return this.http.put(uri, data, options);
    }
    deleteTransDistriByMe(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_delete/${id}`;

        return this.http.delete(uri, options);
    }
    getParentLocationByChild(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/location_parents/${id}`;

        return this.http.get(uri, options);
    }
    // distributed by me apis start
    getDistributedByMe() {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_mydistributes`;

        return this.http.get(uri, options);
    }
    updateDistributedByMe(id: number) {
        const options = this.utilService.httpClientHeaderOptions();
        const uri = `${apiUri}/stock_update_distribution/${id}`;

        return this.http.put(uri, options);
    }
}
