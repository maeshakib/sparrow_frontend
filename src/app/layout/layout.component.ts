import { Component, OnInit } from '@angular/core';
import { DataCommunicationService } from '../shared/services/data-communication.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
   sideBarStatus:boolean=false;  
    collapedSideBar: boolean;

    constructor(
        public dataCommunicationService: DataCommunicationService
    ) {}

    ngOnInit() {
  
        this.dataCommunicationService.getLoggedUserName.subscribe(res => {
            if (res !== undefined) {

              //  this.userEmail = res;
                this.sideBarStatus=true;
                console.log(this.sideBarStatus);

            }
        })
    
    }
 
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
