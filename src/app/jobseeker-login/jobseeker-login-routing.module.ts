import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobseekerLoginComponent } from './jobseeker-login.component';

const routes: Routes = [
    {
        path: '',
        component: JobseekerLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobseekerLoginRoutingModule {}
