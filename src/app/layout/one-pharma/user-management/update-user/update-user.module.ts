import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { UpdateUserRoutingModule } from './update-user-routing.module';
import { UpdateUserComponent } from './update-user.component';
import { PageHeaderModule } from '../../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
    imports: [CommonModule, Ng2Charts, UpdateUserRoutingModule, PageHeaderModule,NgbModule.forRoot(),
    FormsModule,ReactiveFormsModule,EditorModule],
    declarations: [UpdateUserComponent]
})
export class UpdateUserModule {}
