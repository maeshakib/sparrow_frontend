import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { SingleJobShortlistCvRoutingModule } from './single-job-shortlist-cv-routing.module';
import { SingleJobShortlistCvComponent } from './single-job-shortlist-cv.component';
import { PageHeaderModule } from '../../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ShortListSearchPipe } from './shortlist-search.pipe';





@NgModule({
    imports: [CommonModule, Ng2Charts, SingleJobShortlistCvRoutingModule,
        PageHeaderModule, FormsModule, ReactiveFormsModule,
        NgbModule.forRoot(), OwlDateTimeModule, OwlNativeDateTimeModule, 
    ],
    declarations: [SingleJobShortlistCvComponent,ShortListSearchPipe]
})
export class SingleJobShortlistCvModule { } 
