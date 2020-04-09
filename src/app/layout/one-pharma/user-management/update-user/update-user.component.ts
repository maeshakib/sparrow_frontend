import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../shared/services/user.service';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss'],
    animations: [routerTransition()],
    providers: [DatePipe]
})

export class UpdateUserComponent implements OnInit {
    updateForm: FormGroup;
    public allDesignation;
    public allDepartment;
    public allDepot;
    public allRole;
    public allLocation = [];
    public serverPath = ServerBasePath.serverPath;
    fileToUpload: File = null;
    submitted = false;
    public updateStatus: boolean = false;
    categoryImage;
    public userId;
    public allSupervisors
    allUser;
    lastSelectedLocationId: Number = null;
    lastSelectedLocationName: String = null;
    lastSelectedDesignationId: Number = null;
    lastSelectedDesignation: String = null;
    lastSelectedDepartment: String = null;
    lastSelectedDepartmentId: Number = null;
    lastSelectedDepotId: Number = null;
    lastSelectedDepot: String = null;
    existingPhoto: string = null;
    private base64textString: String = "";
    uploadedImageUrl = null;
    public modalRef: NgbModalRef;

    closeResult: string;
    constructor(
        private toastr: ToastrService,
        private userService: UserService,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private modalService: NgbModal,
        public fb: FormBuilder,
        public router: Router
    ) { }

    ngOnInit() {
        this.getRegisterData();
        this.getAllUser();
        this.userId = this.route.params["value"].userId;
        this.userService.getUser(this.userId).subscribe(res => {
            this.updateStatus = true;
            this.initiateUpdateForm(res["original"]["user"]);
            res["original"]["selected_location"].map((selectedLocationObj, i) => {

                if (selectedLocationObj.parent_id === 0) {
                    const topLocationIndex = this.allLocation[0].loclist.findIndex(x => x.id == selectedLocationObj.selected_loc_id);
                    this.allLocation[0].loclist[topLocationIndex]["selected"] = true;
                }
                else {
                    this.userService.getLevelLocList(selectedLocationObj.parent_id).subscribe(levelWithLocation => {
                        this.allLocation.push(levelWithLocation["original"]);
                        const locIndex = this.allLocation[i].loclist.findIndex(x => x.id == selectedLocationObj.selected_loc_id);
                        this.allLocation[i].loclist[locIndex]["selected"] = true;
                    });
                }
            });
        });

    }

    initiateUpdateForm(data) {
        var date = new Date(data.join_date.toString());
        console.log(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //As January is 0.
        var yyyy = date.getFullYear();
        var join = {
            year: yyyy,
            month: mm,
            day: dd
        } 
        console.log(join);
        const status = data.status.toString();
        const is_supervisor = data.is_supervisor.toString();
        const gender = data.gender.toString();

        this.lastSelectedDesignation = data.designation.name;
        this.lastSelectedDepartment = data.department.name;
        if (data.depot) {
            this.lastSelectedDepot = data.depot.name;
        }
        this.lastSelectedLocationName = data.location_area.name;
        const location_area_id = data.location_area_id;
        this.existingPhoto = data.photo;
        // const day = new Date();
        // const today = this.datepipe.transform(day, 'yyyy-MM-dd');
        this.updateForm = this.fb.group({
            'name': [data.name, Validators.required],
            'email': [data.email, [Validators.required, Validators.email]],
            'mobile_no': [data.mobile_no, Validators.required],
            'national_identification_num': [data.national_identification_num],
            'gender': [gender, Validators.required],
            'role_id': [data.role_id, Validators.required],
            'designation_id': [data.designation_id, Validators.required],
            'department_id': [data.department_id, Validators.required],
            'depot_id': [data.depot_id],
            'supervisor_id': [data.supervisor_id, Validators.required],
            'is_supervisor': [is_supervisor, Validators.required],
            'location_area_id': [location_area_id, Validators.required],
            'address': [data.address],
            'description': [data.description],
            'status': [status],
            'format_join_date': [join, Validators.required]
        });
    }
    // convenience getter for easy access to form fields
    get form() { return this.updateForm.controls; }

    getRegisterData() {
        this.userService.getRegisterData().subscribe(res => {
            this.allDesignation = res["original"]["designations"];
            this.allDepartment = res["original"]["departments"];
            this.allDepot = res["original"]["depots"];
            this.allRole = res["original"]["roles"];
            this.allLocation = res["original"]["levels"];
            this.allSupervisors = res["original"]["supervisors"];

        });
    }
    getAllUser() {
        this.userService.getAllUser().subscribe(res => {
            this.allUser = res["original"];

        });
    }
    getLocationLevelId(event, i) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedLocationName = selectedOptions[selectedIndex].text;

        const levelId = event.target.value;
        this.lastSelectedLocationId = levelId;
        if (event.target.value !== "") {
            this.userService.getLevelLocList(levelId).subscribe(res => {
                const index = this.allLocation.findIndex(x => x.id == res["original"].id);
                if (res["original"]["loclist"].length !== 0) {
                    if (index == -1) {
                        this.allLocation.push(res["original"]);
                    } else {
                        this.allLocation.length = i + 1;
                        this.allLocation.push(res["original"]);
                    }
                } else {
                    this.allLocation.length = i + 1;
                }
            });
        }
    }

    getDepartmentName(event) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedDepartment = selectedOptions[selectedIndex].text;

        this.lastSelectedDepartmentId = event.target.value;
    }
    getDesignationName(event) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedDesignation = selectedOptions[selectedIndex].text;

        this.lastSelectedDesignationId = event.target.value;
    }


    updateUser(formData, isValid) {
        this.submitted = true;
        if (isValid) {
            this.userService.updateUser(formData, this.userId, this.fileToUpload).subscribe(res => {
                if (res["original"].success) {
                    this.toastr.success('User Information Updated')
                } else {
                    this.toastr.error('Update Information Failed');
                }
            })
        }
    }

    locationModal(showLocationModal) {
        this.modalRef = this.modalService.open(showLocationModal, { backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    designationModal(showDesignationModal) {
        this.modalRef = this.modalService.open(showDesignationModal, { size: 'lg', backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    departmentModal(showDepartmentModal) {
        this.modalRef = this.modalService.open(showDepartmentModal, { size: 'lg', backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    createModal(create) {
        this.modalService.open(create, { size: 'lg', backdrop: 'static' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    viewModal(view) {
        this.modalService.open(view, { size: 'lg', backdrop: 'static' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    editModal(update, id) {
        this.modalService.open(update, { size: 'lg', backdrop: 'static' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    deleteModal(deleteSchedule) {

        this.modalService.open(deleteSchedule, { size: 'lg', backdrop: 'static' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    depotModal(showDepotModal) {
        this.modalRef = this.modalService.open(showDepotModal, { size: 'lg', backdrop: 'static' });
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
    handleFileInput(event) {
        if (event.target.files && event.target.files[0]) {
            this.fileToUpload = event.target.files[0];

            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
                this.uploadedImageUrl = event.target["result"];
            }
        }
    }
    confirmAddLocation() {
        this.updateForm.controls['location_area_id'].setValue(this.lastSelectedLocationId);
        this.modalRef.close();
    }
    confirmAddDesignation() {
        this.updateForm.controls['designation_id'].setValue(this.lastSelectedDesignationId);
        this.modalRef.close();
    }

    getDepotName(event) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedDepot = selectedOptions[selectedIndex].text;

        this.lastSelectedDepotId = event.target.value;
    }

    confirmAddDepartment() {
        this.updateForm.controls['department_id'].setValue(this.lastSelectedDepartmentId);
        this.modalRef.close();
    }
    confirmAddDepot() {
        this.updateForm.controls['depot_id'].setValue(this.lastSelectedDepotId);
        this.modalRef.close();
    }
}
