import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AddRolePermissionRoutingModule } from './add-role-permission-routing.module';
import { AddRolePermissionComponent } from './add-role-permission.component';
import { PageHeaderModule } from '../../../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
    imports: [CommonModule, Ng2Charts, AddRolePermissionRoutingModule, PageHeaderModule,NgbModule.forRoot(),
    FormsModule,ReactiveFormsModule,EditorModule],
    declarations: [AddRolePermissionComponent]
})
export class AddRolePermissionModule {}
