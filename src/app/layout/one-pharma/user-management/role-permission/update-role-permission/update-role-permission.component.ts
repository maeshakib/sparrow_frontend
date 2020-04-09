import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { role } from '../../../helper';
import { RolePermissionService } from '../../../../../shared/services/role-permission.service';
import { ServerBasePath } from '../../../../../shared/Server-Base-Path/server-path'
import { DataCommunicationService } from '../../../../../shared/services/data-communication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-role-permission',
    templateUrl: './update-role-permission.component.html',
    styleUrls: ['./update-role-permission.component.scss'],
    animations: [routerTransition()]
})

export class UpdateRolePermissionComponent implements OnInit {
    allStatus = role;
    updateForm: FormGroup;

    submitted = false;//submit_status
    public serverPath = ServerBasePath.serverPath;
    fileToUpload: File = null;
    public categoryImage;
    public updateRoleStatus;
    public rolePermissions;
    public checkPermissions;
    public permissionList;
    resErrors = null;

    closeResult: string;
    constructor(
        private toastr: ToastrService,
        private dataCommunicationService: DataCommunicationService,
        private rolePermissionService: RolePermissionService,
        private route: ActivatedRoute,
        public fb: FormBuilder,
        public router: Router
    ) {  }

    ngOnInit() {
        const roleId = this.route.params["value"].roleId;
        this.rolePermissionService.getRole(roleId).subscribe(res => {
            this.initiateUpdateForm(res["original"].roles);
            this.updateRoleStatus = res;
            this.permissionList = res["original"].data;
            var resultArray = Object.keys(res["original"].data).map(function (permissionNamedIndex) {
                let permission = res["original"].data[permissionNamedIndex];
                return permission;
            });
            this.permissionList = resultArray;
        });
    }

    initiateUpdateForm(data) {
        const deletable = data.is_deletable.toString();
        this.updateForm = this.fb.group({
            'name': [data.name, Validators.required],
            'description': [data.description, Validators.required],
            'is_deletable': [deletable]
        });
    }
    // convenience getter for easy access to form fields
    get form() { return this.updateForm.controls; }

    selectRole(event, i, roleId) {
        if (event.target.checked) {
            this.resErrors = null;
            this.permissionList[i].permission_id = roleId;
            this.permissionList[i].child.map(res => {
                res.permission_id = res.id;
            })
        } else {
            this.permissionList[i].permission_id = null;
            this.permissionList[i].child.map(res => {
                res.permission_id = null;
            })
        }
    }
    selectChildren(event, i, roleId) {
        console.log(event);
        console.log(i);
        console.log(roleId);
        if (event.target.checked) {
            this.permissionList[i].permission_id = roleId;
            this.permissionList[i].child.map((res, j) => {
                if (res.id == event.target.value) {
                    this.permissionList[i].child[j].permission_id = event.target.value;
                }
            });
        } else {
            let count = 0;
            this.permissionList[i].child.map((res, j) => {
                if (res.id == event.target.value) {
                    this.permissionList[i].child[j].permission_id = null;
                }
                if (res.permission_id !== null) {
                    count++;
                }
            });
            if (count > 0) {
                this.permissionList[i].permission_id = roleId;
            } else {
                this.permissionList[i].permission_id = null;
            }
        }

    }
    getPermissionIds() {
        const permissionData = [];
        this.permissionList.filter(res => {
            if (res.permission_id !== null) {
                permissionData.push(res.id);

                res.child.filter(res => {
                    if (res.permission_id !== null) {
                        permissionData.push(res.id);
                    }
                });
            }
        });
        return permissionData;
    }

    updateRolePermission(formdata, isValid) {
        this.submitted = true; //form submitted
        formdata.permissions = this.getPermissionIds();
        if (isValid) {
            this.rolePermissionService.updateRolePermission(formdata, this.route.params["value"].roleId).subscribe(res => {
                if (res["original"].success == true) {
                    this.resErrors = null;
                    this.toastr.success('Role Successfully Updated');
                } else {
                    this.toastr.error('Role Update Failed');
                    this.resErrors = res["original"].error;
                }
            });
        }
    }

    selectAll(event) {
        if (event.target.checked) {
            this.resErrors = null;
            this.permissionList.filter((res, i) => {
                this.permissionList[i].permission_id = res.id;
                res.child.filter((res, j) => {
                    this.permissionList[i].child[j].permission_id = res.id;
                });
            });
        } else {
            this.permissionList.filter((res, i) => {
                this.permissionList[i].permission_id = null;
                res.child.filter((res, j) => {
                    this.permissionList[i].child[j].permission_id = null;
                });
            });
        }
    }

}
