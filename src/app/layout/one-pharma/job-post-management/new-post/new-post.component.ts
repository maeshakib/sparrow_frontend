import { Component, OnInit } from '@angular/core';
import { JobPostService } from '../../../../shared/services/job-post.service';


import { routerTransition } from '../../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  animations: [routerTransition()],
})
export class NewPostComponent implements OnInit {

  public allDesignation;
  public resErrors;
  public addForm;
  public updateForm;
  public submitted=false;
 
  public designation
  public designationId;
  public closeResult;
  public modalRef: NgbModalRef;
    constructor(private jobPostService:JobPostService,
      private modalService: NgbModal,
      public router: Router,
      public fb: FormBuilder,
      private toastr: ToastrService,


      ) { }

 
  ngOnInit() {
    this.initiateAddForm();

 
    }

    
    initiateAddForm() { 
      this.addForm = this.fb.group({
          'job_title': ['', Validators.required],
          'vacancy_notice': ['', Validators.required],
          'position_number': ['', Validators.required],
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
            this.modalRef.close();
            this.toastr.success('Job Post Successfully Saved');
            this.router.navigate(['/job-post-managemnet']);

        }
        else {
            this.resErrors = res['errors'];
            this.toastr.error('Job Post Saved Failed');
        }
    });
}
}

}
