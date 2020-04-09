import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AuthService } from './shared/guard/auth.service';

import { UserService } from './shared/services/user.service';
import { UtilService } from './shared/services/util.service';
import { SprintService } from './shared/services/sprint.service';
import { KnowledgeService } from './shared/services/knowledge.service';
import { ProblemService } from './shared/services/problem.service';
import { ReportService } from './shared/services/report.service';
import { DrawService } from './shared/services/draw.service';
import { FarmerService } from './shared/services/farmer.service';
import { RolePermissionService } from './shared/services/role-permission.service';
import { DataCommunicationService } from './shared/services/data-communication.service';
import { BroadcastService } from './shared/services/broadcast.service';
import { InventoryService } from './shared/services/inventory.service';
import { FullLayoutComponent } from './full-layout/full-layout.component';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        Ng4LoadingSpinnerModule.forRoot(),
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-center',
            preventDuplicates: true,
            closeButton: true
        }),
    
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, AuthService, UserService,FarmerService,
        UtilService, SprintService, DrawService, ReportService,
        DataCommunicationService, KnowledgeService, ProblemService,
        RolePermissionService, BroadcastService,InventoryService],
    bootstrap: [AppComponent],
  

})
export class AppModule { }
