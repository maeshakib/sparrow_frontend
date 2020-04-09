import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path';
import { DepartmentService } from '../../../shared/services/department.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.css'],
  animations: [routerTransition()],

})
export class DepartmentManagementComponent implements OnInit {
public resErrors;
public addForm;
public updateForm;
public submitted=false;
public allDept;
public departmentId;
public department;
public closeResult;
public modalRef: NgbModalRef;

  constructor(
    private toastr: ToastrService,
    private deptService:DepartmentService,
    private modalService: NgbModal,
    public router: Router,
    public fb: FormBuilder,


    ) { }

  ngOnInit() 
  {
    this.initiateAddForm();

      this.deptService.getAllDepartment().subscribe(res => {
      
        this.allDept = res["original"]["departments"];
    });

  }
 
  initiateAddForm() { 
    this.addForm = this.fb.group({
        'name': ['', Validators.required],
        'description': [''],       
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

private getDismissReason(reason: any): string 
{
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
}

// convenience getter for easy access to form fields
get form() { return this.addForm.controls; }
createDepartment(formdata, isValid) {     
  this.submitted = true;       
  if (isValid) {

      this.deptService.saveDepartment(formdata).subscribe(res => {
          if (res["original"].success) {
              console.log(res);
              this.modalRef.close();
              this.toastr.success('Department Successfully Saved');
              this.router.navigate(['/department']);
          }
          else {
              this.resErrors = res['errors'];
              this.toastr.error('Department Saved Failed');
          }
      });
  }
}

 //edit start here
 editModal(update, id) {

  this.deptService.getDepartment(id).subscribe((res) => {
    console.log(res);
      this.department = res["original"];
      this.initiateUpdateForm(res["original"]);
     
      this.departmentId = id;
  });
  this.modalRef = this.modalService.open(update, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
//edit end here


//update start here
// convenience getter for easy access to form fields
get updateform() { return this.updateForm.controls; }
updateDepartment(formdata, isValid) {
  this.submitted = true;
  if (isValid) {
  
      this.deptService.updateDepartment(formdata,this.departmentId).subscribe(res => {
          if (res["original"].success == true) {
              this.toastr.success('Department Successfully Updated');
              this.modalRef.close();
              this.router.navigate(['/department']);
          } else {
              console.log(res["original"].errors);
              this.resErrors = res["original"].errors;
              this.toastr.error('Department Update Failed');
          }

      });
  }
}
//update end here


initiateUpdateForm(data) {
  const location_area_id = data.location_area_id;
  this.updateForm = this.fb.group({
      'name': [data.name, Validators.required],
      'description': [data.description, Validators.required],
     });
}
}
