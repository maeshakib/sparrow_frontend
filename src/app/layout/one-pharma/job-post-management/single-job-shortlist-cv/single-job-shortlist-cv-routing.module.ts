import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleJobShortlistCvComponent } from './single-job-shortlist-cv.component';

const routes: Routes = [
    {
        path: '',
        component: SingleJobShortlistCvComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SingleJobShortlistCvRoutingModule {}
