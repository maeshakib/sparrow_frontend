import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    // { path: 'jobseekerlogin', loadChildren: './jobseeker-login/jobseeker-login.module#JobseekerLoginModule' },

    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },

    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
