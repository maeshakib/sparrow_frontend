import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { SingleJobAllCvRoutingModule } from './single-job-all-cv-routing.module';
import { SingleJobAllCvComponent } from './single-job-all-cv.component';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SearchPipe } from './search.pipe';





@NgModule({
    imports: [CommonModule, Ng2Charts, SingleJobAllCvRoutingModule,
        PageHeaderModule, FormsModule, ReactiveFormsModule,
        NgbModule.forRoot(), OwlDateTimeModule, OwlNativeDateTimeModule, 
    ],
    declarations: [SingleJobAllCvComponent,SearchPipe]
})
export class SingleJobAllCvModule { } 
