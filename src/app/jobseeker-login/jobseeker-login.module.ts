import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JobseekerLoginRoutingModule } from './jobseeker-login-routing.module';
import { JobseekerLoginComponent } from './jobseeker-login.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, JobseekerLoginRoutingModule],
    declarations: [JobseekerLoginComponent]
})
export class JobseekerLoginModule {}
