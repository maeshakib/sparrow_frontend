import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthJobListComponent } from './auth-job-list.component';

const routes: Routes = [
    {
        path: '',
        component: AuthJobListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthJobListRoutingModule {}
