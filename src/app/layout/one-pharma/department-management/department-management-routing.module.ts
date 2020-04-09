import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentManagementComponent } from './department-management.component';

const routes: Routes = [
    {
        path: '',
        component: DepartmentManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentManagementRoutingModule {}
