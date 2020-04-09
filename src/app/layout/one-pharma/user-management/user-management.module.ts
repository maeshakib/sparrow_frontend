import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, Ng2Charts, UserManagementRoutingModule, PageHeaderModule,NgbModule.forRoot(),FormsModule,ReactiveFormsModule],
    declarations: [UserManagementComponent],
    exports: [ ]
})
export class UserManagementModule {}
