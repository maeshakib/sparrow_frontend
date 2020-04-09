import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { DepartmentManagementComponent } from './department-management.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';





@NgModule({
    imports: [CommonModule, Ng2Charts, DepartmentManagementRoutingModule,
        PageHeaderModule, FormsModule, ReactiveFormsModule,
        NgbModule.forRoot(), OwlDateTimeModule, OwlNativeDateTimeModule],
    declarations: [DepartmentManagementComponent]
})
export class DepartmentManagementModule { } 
