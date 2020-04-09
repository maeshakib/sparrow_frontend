import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'app-notification-message',
    templateUrl: './notification-message.component.html',
    styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent implements OnInit {
    private readonly notifier: NotifierService;
    constructor(notifier: NotifierService,) {
        this.notifier = notifier; 
    }
    showNotification(){
        this.notifier.notify('success', 'You are awesome! I mean it!');
    }
    ngOnInit() {}
}
