import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileManagementComponent } from './profile-management.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileManagementRoutingModule {}
