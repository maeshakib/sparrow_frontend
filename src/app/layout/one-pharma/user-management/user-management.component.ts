import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SprintService } from '../../../shared/services/sprint.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { knowledge } from '../helper';
import { KnowledgeService } from '../../../shared/services/knowledge.service';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path'
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    animations: [routerTransition()]
})

export class UserManagementComponent implements OnInit {
    userStatus = knowledge;
    public replaceableUserId;
    public serverPath = ServerBasePath.serverPath;
    public allUser;
    public base64textString;
    fileToUpload: File = null;
    public categoryImage;
    public selectedUserId;
    public modalRef: NgbModalRef;
    public allSupervisors;
    public allSupervisors_for_delete;

    closeResult: string;
    constructor(
        private toastr: ToastrService,
        private userService: UserService,
        private modalService: NgbModal,
        public fb: FormBuilder
    ) { }

    ngOnInit() {
        this.getAllUser();
        this.getRegisterData();
    }

    getAllUser() {
        this.userService.getAllUser().subscribe(res => {
            console.log(res)
            this.allUser = res["original"];
        });
    }

    deleteModal(deleteUser, id) {
        this.getRegisterData();
        this.allSupervisors_for_delete = this.allSupervisors;
        var unchecked_element_index = this.allSupervisors_for_delete.findIndex(
            (element) => {
                return (element.id == id);
            }
        );

        if (unchecked_element_index >= 0) {
            this.allSupervisors_for_delete.splice(unchecked_element_index, 1); //remove element
        }


        this.selectedUserId = id;

        this.modalRef = this.modalService.open(deleteUser, { size: 'lg', backdrop: 'static' });
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
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        this.categoryImage = btoa(binaryString);
    }
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        var reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(this.fileToUpload);
    }
    deleteUser() {
        this.userService.deleteUser(this.selectedUserId, this.replaceableUserId).subscribe(res => {
            console.log(res);
            if (res["original"].success) {
                this.modalRef.close();
                this.toastr.success('User Successfully Deleted');
            } else {
                this.toastr.error('User Deleted Failed');
            }
        });
    }

    replaceableUser(e) {
        this.replaceableUserId = e.target.value;
    }
    getRegisterData() {
        this.userService.getRegisterData().subscribe(res => {
            this.allSupervisors = res["original"]["supervisors"];

        });
    }
}
