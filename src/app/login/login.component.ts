import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/guard/auth.service';
import { DataCommunicationService } from '../shared/services/data-communication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public getjobId;
    loginForm: FormGroup;
    errorStatus;

    constructor(
        private route: ActivatedRoute,  
        public dataCommunicationService: DataCommunicationService, public fb: FormBuilder, 
        public router: Router, public authService: AuthService) { }

    ngOnInit() {
    //     localStorage.getItem('currentRoute');
    //   this.getjobId =   localStorage.getItem('currentRoute').split("/").pop();
        this.loginForm = this.fb.group({
            'Email': ['', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
            'Password': ['', Validators.required]
        });
    }

    UserLogin(formdata, isValid) {
        if (isValid) {
            const pRoute= localStorage.getItem('previousRoute');
           // console.log(pRoute);
            this.authService.login(formdata).subscribe(res => {
                localStorage.setItem('accessToken', res["access_token"]);
                localStorage.setItem('userId', res["u_id"]);
                this.router.navigate(['/dashboard']);
                // if(localStorage.getItem('currentRoute') !=''){
                //     console.log('yes');
                //     this.router.navigate(['/resume', {queryParams:{val: this.getjobId}}]);
                // }else{
                // this.router.navigate(['/dashboard']);

                // }
            }, error => {
                this.errorStatus = true;
                // this.errorList = error.json();
            });
        }
    }
}
