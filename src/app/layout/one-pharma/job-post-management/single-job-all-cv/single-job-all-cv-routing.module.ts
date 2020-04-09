import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleJobAllCvComponent } from './single-job-all-cv.component';

const routes: Routes = [
    {
        path: '',
        component: SingleJobAllCvComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SingleJobAllCvRoutingModule {}
