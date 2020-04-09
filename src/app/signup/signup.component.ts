import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/guard/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    public submitted=false;

    registrationForm: FormGroup;
    constructor(public fb: FormBuilder, public authService: AuthService, public router: Router,
        ) { }

    ngOnInit() {
        this.registrationForm = this.fb.group({
            'Name': ['', Validators.required],
            'Email': ['', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
            'Password': ['', Validators.required],
            'RepeatPassword': ['', Validators.required],        
            'mobile_no': ['', Validators.required],
            'gender': ['', Validators.required],


        });
    }
    UserRegistration(formdata, isValid) {
        this.submitted = true;       

        if (isValid) {
            this.authService.registration(formdata).subscribe(response => {
               if(response['success']){
                this.router.navigate(['/login']);
               }
            });
        }
    }

    // convenience getter for easy access to form fields
get registrationform() { return this.registrationForm.controls; }
}

