import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolePermissionComponent } from './role-permission.component';

const routes: Routes = [
    {
        path: '',
        component: RolePermissionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolePermissionRoutingModule {}
