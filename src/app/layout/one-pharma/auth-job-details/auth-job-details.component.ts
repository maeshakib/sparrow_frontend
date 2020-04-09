import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { JobPostService } from '../../../shared/services/job-post.service';
import { DataCommunicationService } from '../../../shared/services/data-communication.service';
import { AppliedJobService } from '../../../shared/services/applied-job.service';




import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path';
import { DepartmentService } from '../../../shared/services/department.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth-job-details',
  templateUrl: './auth-job-details.component.html',
  styleUrls: ['./auth-job-details.component.css'],
  animations: [routerTransition()],
})
export class AuthJobDetailsComponent implements OnInit {
  public resErrors;
  public addForm;
  public updateForm;
  public submitted=false;
  public allDept;
  public departmentId;
  public department;
  public closeResult;
  public modalRef: NgbModalRef;

  public accessToken;
  public jobId;
  public userId;
public singleJobs;
public userEmail;

  constructor(
    public dataCommunicationService: DataCommunicationService,
    private route: ActivatedRoute,  
    public router: Router,
    private JobService :JobPostService, 
    private appliedJobService: AppliedJobService,
  
    private toastr: ToastrService,
    private deptService:DepartmentService,
    private modalService: NgbModal,
    public fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.initiateAddForm();


    localStorage.setItem('currentRoute', this.router.url);

    this.accessToken = localStorage.getItem('accessToken');
    this.userId = localStorage.getItem('userId');

    this.jobId = this.route.params["value"].jobId;
    this.JobService.getSingleJobs(this.jobId).subscribe(res => {       
      this.singleJobs = res;
  });


  this.dataCommunicationService.getLoggedUserName.subscribe(res => {
    if (res !== undefined) {
        this.userEmail = res;
        console.log(this.userEmail);
    }
})



  }
  //end ngOnInit



 
  initiateAddForm() { 
    this.addForm = this.fb.group({
            
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




UserJobApply(formData, isValid) {
  console.log('here');
    this.submitted = true;
    if (isValid) {
        this.appliedJobService.applyJobPost(formData,this.singleJobs.id).subscribe(res => {
          console.log(formData);
            if (res["original"].success) {
                this.toastr.success('Job Applyed Successfully')
                this.router.navigate(['/job-management']);

                
            } else {
                this.toastr.error('Job Applyed Successfully Failed');
            }
        })
    }
}





}
