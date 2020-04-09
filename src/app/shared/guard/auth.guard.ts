import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.checkLogged()) {
            this.authService.logout();
            this.router.navigate(['/login']);
            console.log('i am here');
            return false;
        }
        return true;
    }
    // canActivate() {
    //     if (localStorage.getItem('accessToken')) {
    //         return true;
    //     }

    //     this.router.navigate(['/login']);
    //     return false;
    // }

}
