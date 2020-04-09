import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';
import { DataCommunicationService } from '../../../shared/services/data-communication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    public permissionList;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private dataCommunicationService: DataCommunicationService, private userService: UserService, private translate: TranslateService, public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }
    ngOnInit() {
        this.userService.getUserPermission().subscribe(res => {
 
            this.dataCommunicationService.userName(res["user_email"]);
            // start data processing here
            /*res["original"].raw_data.map(parent => {
                if (parent.parent_id == null) {
                    const name = parent.name;
                    let permissions = {};
                    res["original"].raw_data.map(child => {
                        if (child.parent_id == parent.id) {
                            permissions[child.name] = child.perm_id;
                        }
                        this.permissionList[name] = permissions;
                    })
                }
            })*/
            // end data processing here
            this.permissionList = res['raw_data'];
            let methodPermission = {};

            for (var key in this.permissionList) {
                let name = key;
                let test = {};
                this.permissionList[key].child.map(x => {
                    if (this.permissionList[key].id == x.parent_id) {
                        test[x.name] = x.permission_id;
                    }
                    methodPermission[name] = test;
                })
            }
            this.dataCommunicationService.permissionList(methodPermission);
        });
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
