import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { PageHeaderModule } from '../../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
    imports: [CommonModule, Ng2Charts, AddUserRoutingModule, PageHeaderModule,NgbModule.forRoot(),
    FormsModule,ReactiveFormsModule,EditorModule],
    declarations: [AddUserComponent]
})
export class AddUserModule {}
