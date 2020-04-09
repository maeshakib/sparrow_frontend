import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateRolePermissionComponent } from './update-role-permission.component';

const routes: Routes = [
    {
        path: '',
        component: UpdateRolePermissionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateRolePermissionRoutingModule {}
