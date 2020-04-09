import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobPostManagementComponent } from './job-post-management.component';

const routes: Routes = [
    {
        path: '',
        component: JobPostManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobPostManagementRoutingModule {}
