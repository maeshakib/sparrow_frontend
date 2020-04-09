import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthJobDetailsComponent } from './auth-job-details.component';

const routes: Routes = [
    {
        path: '',
        component: AuthJobDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthJobDetailsRoutingModule {}
