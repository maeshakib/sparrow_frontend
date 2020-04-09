import { Component, OnInit } from '@angular/core';
import { JobPostService } from '../../../shared/services/job-post.service';


import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-job-post-management',
  templateUrl: './job-post-management.component.html',
  styleUrls: ['./job-post-management.component.css'],
  animations: [routerTransition()],
})
export class JobPostManagementComponent implements OnInit {

  public allPostedJobs;
  public resErrors;
  public addForm;
  public updateForm;
  public submitted=false;
  public allDept;
  public designation
  public designationId;
  public closeResult;
  public modalRef: NgbModalRef;
    constructor(
      private jobPostService :JobPostService,
      private modalService: NgbModal,
      public router: Router,
      public fb: FormBuilder,
      private toastr: ToastrService,


      ) { }

    ngOnInit() {
      this.initiateAddForm();

        this.jobPostService.getAllPostedJobs().subscribe(res => {
        
          this.allPostedJobs = res["original"]["all_posted_job"];
      });
    
      }
      initiateAddForm() { 
        this.addForm = this.fb.group({
            'job_title': ['', Validators.required],
            'vacancy_notice': ['', Validators.required],
            'postition_number': ['', Validators.required],
            'location': ['', Validators.required],
            'position_grade': ['', Validators.required],
            'closing_date': ['', Validators.required],
            'organizational_context': ['', Validators.required],
            'responsibilities': ['', Validators.required],
            'accountability_and_authority': ['', Validators.required],
            'minimum_qualification': ['', Validators.required],
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
createPostJob(formdata, isValid) {     
this.submitted = true;       
if (isValid) {

    this.jobPostService.saveJobPost(formdata).subscribe(res => {
        if (res["original"].success) {
            console.log(res);
            this.modalRef.close();
            this.toastr.success('New Job Successfully Saved');
            this.router.navigate(['/department']);
        }
        else {
            this.resErrors = res['errors'];
            this.toastr.error('New Job Saved Failed');
        }
    });
}
}


} 
//end class
