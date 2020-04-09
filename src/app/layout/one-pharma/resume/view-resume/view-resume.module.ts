import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ViewResumeRoutingModule } from './view-resume-routing.module';
import { ViewResumeComponent } from './view-resume.component';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';





@NgModule({
    imports: [CommonModule, Ng2Charts, ViewResumeRoutingModule,
        PageHeaderModule, FormsModule, ReactiveFormsModule,
        NgbModule.forRoot(), OwlDateTimeModule, OwlNativeDateTimeModule],
    declarations: [ViewResumeComponent]
})
export class ViewResumeModule { } 
