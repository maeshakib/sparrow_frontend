import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, LoginRoutingModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
