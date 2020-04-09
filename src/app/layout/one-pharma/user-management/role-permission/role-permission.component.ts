import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { RolePermissionService } from '../../../../shared/services/role-permission.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataCommunicationService } from '../../../../shared/services/data-communication.service';
import { role } from '../../helper';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss'],
  animations: [routerTransition()]
})
export class RolePermissionComponent implements OnInit {
  public allRoles;
  public roleId;
  closeResult: string;
  roleStatus = role;
  exampleParent: string;
  allRolesFD = [];
  replaceableRoleId;
  resError = null;
  public modalRef: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private dataCommunicationService: DataCommunicationService,
    private rolePermissionService: RolePermissionService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolePermissionService.getRoles().subscribe(res => {
      this.allRoles = res["original"];
      this.dataCommunicationService.getStatusMessage.subscribe(res => {
        if (res !== '') {
          this.toastr.success(res);
          this.dataCommunicationService.statusMessages('');
        };
      });
    })
  }
  deleteModal(deleteRole, roleId) {
    this.roleId = roleId;
    this.allRolesFD = Object.assign([], this.allRoles);
    const index = this.allRolesFD.findIndex(x => x.id == roleId);
    this.allRolesFD.splice(index, 1);
    this.modalRef = this.modalService.open(deleteRole, { size: 'lg', backdrop: 'static' });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  deleteRolePermission() {
    this.rolePermissionService.deleteRolePermission(this.roleId, this.replaceableRoleId).subscribe(res => {
      if (res["original"].success) {
        this.modalRef.close();
        this.toastr.success('Role Successfully Deleted');
        this.getAllRoles();
      } else {
        this.resError = res["original"].error;
        this.toastr.error('Role Delete Failed');
      }
    })
  }
  replaceableRole(e) {
    this.replaceableRoleId = e.target.value;
  }
}

