import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRolePermissionComponent } from './add-role-permission.component';

const routes: Routes = [
    {
        path: '',
        component: AddRolePermissionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddRolePermissionRoutingModule {}
