import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { SprintService } from '../../../../shared/services/sprint.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { knowledge } from '../../helper';
import { DataCommunicationService } from '../../../../shared/services/data-communication.service';
import { UserService } from '../../../../shared/services/user.service';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    animations: [routerTransition()],
    providers: [DatePipe]

})

export class AddUserComponent implements OnInit {
    knowledgeStatus = knowledge;
    addForm: FormGroup;
    public resErrors=null;
    public joiningDate; //
    public allDesignation;
    public allDepartment;
    public allDepot;
    public allRole;
    public allLocation;
    public allSupervisors;
    public serverPath = ServerBasePath.serverPath;
    fileToUpload: File = null;
    public categoryImage;
    public suggestedKnowledge;
    public suggestion;
    submitted = false;
    allUser;
    lastSelectedLocationId: Number = null;
    lastSelectedLocationName: String = null;
    lastSelectedDesignationId: Number = null;
    lastSelectedDesignation: String = null;
    lastSelectedDepartmentId: Number = null;
    lastSelectedDepartment: String = null;
    lastSelectedDepotId: Number = null;
    lastSelectedDepot: String = null;   

    private base64textString: String = "";
    uploadedImageUrl = null;
    public modalRef: NgbModalRef;

    closeResult: string;
    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private userService: UserService,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private sprintService: SprintService,
        private modalService: NgbModal,
        public fb: FormBuilder,
        public router: Router
    ) { }

    ngOnInit() {
        this.getRegisterData();
        this.initiateAddForm();
        this.getAllUser();
    }

    initiateAddForm() {
        // const day = new Date();
        // const today = this.datepipe.transform(day, 'yyyy-MM-dd');
        this.addForm = this.fb.group({
            'name': ['', Validators.required],
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', Validators.required],
            'retype_password': ['', Validators.required],
            'mobile_no': ['', Validators.required],
            'national_identification_num': [''],
            'gender': ['1', Validators.required],
            'role_id': ['', Validators.required],
            'designation_id': ['', Validators.required],
            'department_id': ['', Validators.required],
            'supervisor_id': ['', Validators.required],
            'is_supervisor': ['0'],
            'location_area_id': ['', Validators.required],
            'address': [''],
            'description': [''],
            'status': ['1'],
            'join_date': ['']
        });
    }
    // convenience getter for easy access to form fields
    get form() { return this.addForm.controls; }
    getRegisterData() {
        this.userService.getRegisterData().subscribe(res => {
            this.allDesignation = res["original"]["designations"];
            this.allDepartment = res["original"]["departments"];
            this.allRole = res["original"]["roles"];
            console.log(this.allRole);
            this.allSupervisors = res["original"]["supervisors"];
            this.allLocation = res["original"]["levels"];
            this.allDepot = res["original"]["depots"];
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
                        // this.allLocation.splice(index, 1);
                        this.allLocation.length = i + 1;
                        this.allLocation.push(res["original"]);
                    }
                } else {
                    this.allLocation.length = i + 1;
                }
            });
        }
    }
    getDesignationName(event) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedDesignation = selectedOptions[selectedIndex].text;

        this.lastSelectedDesignationId = event.target.value;
    }
    getDepartmentName(event) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedDepartment = selectedOptions[selectedIndex].text;

        this.lastSelectedDepartmentId = event.target.value;
    }
    getDepotName(event) {
        let selectedOptions = event.target['options'];
        let selectedIndex = selectedOptions.selectedIndex;
        this.lastSelectedDepot = selectedOptions[selectedIndex].text;

        this.lastSelectedDepotId = event.target.value;
    }
    createUser(formData, isValid) {
        this.submitted = true;
        if (isValid) {
            const date = formData["join_date"];
            formData["join_date"] = this.datePipe.transform(`${date.year}-${date.month}-${date.day}`, 'yyyy-MM-dd');

            this.spinnerService.show();
            this.userService.saveUser(formData, this.fileToUpload).subscribe(res => {
                if (res["original"].success) {
                    this.spinnerService.hide();
                    this.router.navigate(['/user-management']);
                } else {
                    console.log('please add error message here');
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
    depotModal(showDepotModal) {
        this.modalRef = this.modalService.open(showDepotModal, { size: 'lg', backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    createModal(create) {
        this.modalRef = this.modalService.open(create, { size: 'lg', backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    viewModal(view) {
        this.modalRef = this.modalService.open(view, { size: 'lg', backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    editModal(update, id) {
        this.modalRef = this.modalService.open(update, { size: 'lg', backdrop: 'static' });
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    deleteModal(deleteSchedule) {
        this.modalRef = this.modalService.open(deleteSchedule, { size: 'lg', backdrop: 'static' });
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
    checkSuggestion(event) {
        const suggestedWord = event.target.value;
        // this.userService.getSuggestedKnowledge(suggestedWord).subscribe(res => {
        //     this.suggestedKnowledge = res["existingKnowledge"];
        //     this.suggestion = this.suggestedKnowledge.length !== 0;
        // })
    }
    confirmAddLocation() {
        this.addForm.controls['location_area_id'].setValue(this.lastSelectedLocationId);
        this.modalRef.close();
    }
    confirmAddDesignation() {
        this.addForm.controls['designation_id'].setValue(this.lastSelectedDesignationId);
        this.modalRef.close();
    }
    confirmAddDepartment() {
        this.addForm.controls['department_id'].setValue(this.lastSelectedDepartmentId);
        this.modalRef.close();
    }
    confirmAddDepot() {
        this.addForm.controls['depot_id'].setValue(this.lastSelectedDepotId);
        this.modalRef.close();
    }
}
