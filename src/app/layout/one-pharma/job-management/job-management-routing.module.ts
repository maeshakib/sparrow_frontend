import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobManagementComponent } from './job-management.component';

const routes: Routes = [
    {
        path: '',
        component: JobManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobManagementRoutingModule {}
