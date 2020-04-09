import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataCommunicationService {

  private loggedUser = new BehaviorSubject<string>('');
  getLoggedUserName = this.loggedUser.asObservable();

  private statusMessage = new BehaviorSubject<string>('');
  getStatusMessage = this.statusMessage.asObservable();

  private sprintId = new BehaviorSubject<string>('');
  getSprintId = this.sprintId.asObservable();

  private permissions = new BehaviorSubject('');
  getPermissionList = this.permissions.asObservable();
  // get item id end
  constructor() { }

  sprintIdAddToSprintComponent(id) {
    this.sprintId.next(id);
  }

  permissionList(permissions){
    this.permissions.next(permissions);
  }

  statusMessages(message){
    this.statusMessage.next(message);
  }

  userName(name){
    this.loggedUser.next(name);
  }

}
