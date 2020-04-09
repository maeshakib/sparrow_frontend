import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/guard/auth.service';
import { DataCommunicationService } from '../shared/services/data-communication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [routerTransition()]

})
export class ResetPasswordComponent implements OnInit {

  public getjobId;
    loginForm: FormGroup;
    panel=true;
    errorStatus;
    successStatus=false;

    constructor(
        private route: ActivatedRoute,  
        public dataCommunicationService: DataCommunicationService, public fb: FormBuilder, 
        public router: Router, public authService: AuthService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            'Email': ['', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
        });
    }


    ResetPassword(formdata, isValid) {
      if (isValid) {
          this.authService.resetPassword(formdata).subscribe(res => {
            this.successStatus=true;
            this.panel=false;
          });
      }
  }
}
