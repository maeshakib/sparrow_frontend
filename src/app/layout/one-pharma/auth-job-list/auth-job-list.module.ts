import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AuthJobListRoutingModule } from './auth-job-list-routing.module';
import { AuthJobListComponent } from './auth-job-list.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';





@NgModule({
    imports: [CommonModule, Ng2Charts, AuthJobListRoutingModule,
        PageHeaderModule, FormsModule, ReactiveFormsModule,
        NgbModule.forRoot(), OwlDateTimeModule, OwlNativeDateTimeModule],
    declarations: [AuthJobListComponent]
})
export class AuthJobListModule { } 
