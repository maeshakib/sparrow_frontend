import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { role } from '../../../helper';
import { RolePermissionService } from '../../../../../shared/services/role-permission.service';
import { DataCommunicationService } from '../../../../../shared/services/data-communication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-role-permission',
    templateUrl: './add-role-permission.component.html',
    styleUrls: ['./add-role-permission.component.scss'],
    animations: [routerTransition()]
})

export class AddRolePermissionComponent implements OnInit {

    allStatus = role;
    addForm: FormGroup;
    public rolePermissions;
    public selectedAll;
    submitted = false;
    allRoles;
    resErrors = null;

    constructor(
        private rolePermissionService: RolePermissionService,
        private dataCommunicationService: DataCommunicationService,
        private route: ActivatedRoute,
        public fb: FormBuilder,
        public router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.initiateAddForm();
        this.getAllPermission();
    }

    initiateAddForm() {
        this.addForm = this.fb.group({
            'name': ['', Validators.required],
            'description': ['', Validators.required],
            'is_deletable': ['1']
        });
    }
    // convenience getter for easy access to form fields
    get form() { return this.addForm.controls; }


    getAllRoles() {
        this.rolePermissionService.getRoles().subscribe(res => {
            this.allRoles = res["original"];
            this.dataCommunicationService.getStatusMessage.subscribe(res => {
                if (res !== '') {
                    this.toastr.success(res);
                };
            });
        })
    }

    createRolePermission(formdata, isValid) {
        this.submitted = true;
        formdata.permissions = this.getPermissionIds();
        if (isValid) {
            this.rolePermissionService.saveRolePermission(formdata).subscribe(res => {
                if (res["original"].success) {
                    this.dataCommunicationService.statusMessages('Role with Permission Successfully Saved');
                    this.router.navigate(['/role-permission']);
                } else {
                    this.toastr.error("Role Save Failed");
                    this.resErrors = res["original"].error;
                }
            });
        } else {
            this.toastr.error("Role Save Failed");
        }
    }

    getAllPermission() {
        this.rolePermissionService.getPermissions().subscribe(res => {
            this.rolePermissions = this.dataMaker(res["original"])
        })
    }
    selectAll(event) {
        if (event.target.checked) {
            this.rolePermissions.filter(res => {
                res.isSelect = true;
                res.children.filter(res => {
                    res.isSelect = true;
                });
            });
        } else {
            this.rolePermissions.filter(res => {
                res.isSelect = false;
                res.children.filter(res => {
                    res.isSelect = false;
                });
            });
        }
    }
    selectRole(event, indexId) {
        if (event.target.checked) {
            this.rolePermissions[indexId].children.map(res => {
                res.isSelect = true;
            })
        } else {
            this.rolePermissions[indexId].children.map(res => {
                res.isSelect = false;
            })
        }
    }
    selectChildren(event, i, j) {
        if (event.target.checked) {
            this.rolePermissions[i].isSelect = true;
        } else {
            let count = 0;
            this.rolePermissions[i].children.map(res => {
                if (res.isSelect === true) {
                    count++;
                }
            });
            if (count > 0) {
                this.rolePermissions[i].isSelect = true;
            } else {
                this.rolePermissions[i].isSelect = false;
            }
        }

    }
    getPermissionIds() {
        const permissionData = [];
        this.rolePermissions.filter(res => {
            if (res.isSelect === true) {
                permissionData.push(res.id);

                res.children.filter(res => {
                    if (res.isSelect === true) {
                        permissionData.push(res.id);
                    }
                });
            } else {
                console.log('error on store permission id');
            }
        });
        return permissionData;
    }
    dataMaker(res) {
        return res.map(role => {
            return {
                id: role.id,
                name: role.name,
                isSelect: true,
                children: this.childDataMaker(role.children)
            };
        });
    }

    childDataMaker(childData) {
        return childData.map((child) => {
            return {
                id: child.id,
                name: child.name,
                isSelect: true
            };
        });
    }
}
