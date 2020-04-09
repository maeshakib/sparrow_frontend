import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { JobListComponent } from './one-pharma/job-list/job-list.component';
import { FullLayoutComponent } from '../../app/full-layout/full-layout.component';
import { JobDetailsComponent } from './one-pharma/job-details/job-details.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,  JobListComponent, FullLayoutComponent, JobDetailsComponent,  ]
})
export class LayoutModule {}
