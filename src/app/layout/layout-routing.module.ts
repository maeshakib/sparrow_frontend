import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FullLayoutComponent } from '../../app/full-layout/full-layout.component';
import { JobListComponent } from '../../app/layout/one-pharma/job-list/job-list.component';
import { JobDetailsComponent } from '../../app/layout/one-pharma/job-details/job-details.component';
import { AuthGuard } from '../shared';


const routes: Routes = [
 
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',  canActivate: [AuthGuard] },
            { path: 'resume', loadChildren: './one-pharma/resume/resume/resume.module#ResumeModule' ,  canActivate: [AuthGuard]},
            { path: 'resume/:jobId', loadChildren: './one-pharma/resume/resume/resume.module#ResumeModule', canActivate: [AuthGuard]  },
            { path: 'view-resume', loadChildren: './one-pharma/resume/view-resume/view-resume.module#ViewResumeModule', canActivate: [AuthGuard] },

            

            { path: 'auth-job-list', loadChildren: './one-pharma/auth-job-list/auth-job-list.module#AuthJobListModule', canActivate: [AuthGuard]  },
            { path: 'auth-job-details/:jobId', loadChildren: './one-pharma/auth-job-details/auth-job-details.module#AuthJobDetailsModule', canActivate: [AuthGuard] },


            { path: 'job-management', loadChildren: './one-pharma/job-management/job-management.module#JobManagementModule' },
            { path: 'job-post-management', loadChildren: './one-pharma/job-post-management/job-post-management.module#JobPostManagementModule' },
            { path: 'job-post-management/new-post', loadChildren: './one-pharma/job-post-management/new-post/new-post.module#NewPostModule' },

            { path: 'job-cv/:jobId', loadChildren: './one-pharma/job-post-management/single-job-all-cv/single-job-all-cv.module#SingleJobAllCvModule', canActivate: [AuthGuard]  },
            { path: 'shortlist-job-cv/:jobId', loadChildren: './one-pharma/job-post-management/single-job-shortlist-cv/single-job-shortlist-cv.module#SingleJobShortlistCvModule', canActivate: [AuthGuard]  },

            { path: 'department', loadChildren: './one-pharma/department-management/department-management.module#DepartmentManagementModule' },
          
            { path: 'user-management', loadChildren: './one-pharma/user-management/user-management.module#UserManagementModule', canActivate: [AuthGuard] },
            { path: 'user-management/add-user', loadChildren: './one-pharma/user-management/add-user/add-user.module#AddUserModule' , canActivate: [AuthGuard]},
            { path: 'user-management/update-user/:userId', loadChildren: './one-pharma/user-management/update-user/update-user.module#UpdateUserModule', canActivate: [AuthGuard] },
            { path: 'role-permission', loadChildren: './one-pharma/user-management/role-permission/role-permission.module#RolePermissionModule' , canActivate: [AuthGuard]},
            { path: 'add-role-permission', loadChildren: './one-pharma/user-management/role-permission/add-role-permission/add-role-permission.module#AddRolePermissionModule' , canActivate: [AuthGuard]},
            { path: 'update-role-permission/:roleId', loadChildren: './one-pharma/user-management/role-permission/update-role-permission/update-role-permission.module#UpdateRolePermissionModule' , canActivate: [AuthGuard]},

            // report route start
     
       // report route end

            // Profile route start
            { path: 'profile', loadChildren: './one-pharma/profile-management/profile-management.module#ProfileManagementModule' },
            // Profile route end

    
        ]
    },
     //Site routes goes here 
  { 
    path: '', 
    component: FullLayoutComponent,
    children: [
     
      { path: 'job-list', component: JobListComponent },
      { path: 'job-details/:jobId', component: JobDetailsComponent },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
