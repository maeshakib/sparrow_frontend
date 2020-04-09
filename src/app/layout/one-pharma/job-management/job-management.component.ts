import { Component, OnInit } from '@angular/core';
import { AppliedJobService } from '../../../shared/services/applied-job.service';


import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-management',
  templateUrl: './job-management.component.html',
  styleUrls: ['./job-management.component.css'],
  animations: [routerTransition()],

})
export class JobManagementComponent implements OnInit {

  public allAppliedJobs;
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
      private appliedJobService :AppliedJobService,
      private modalService: NgbModal,
      public router: Router,
      public fb: FormBuilder,
      private toastr: ToastrService,


      ) { }

    ngOnInit() {
      this.initiateAddForm();

        this.appliedJobService.getAllAppliedJobs().subscribe(res => {
        
          this.allAppliedJobs = res["original"]["applied_job"];
      });
    
      }
      initiateAddForm() { 
        this.addForm = this.fb.group({
            'job_post_id': ['', Validators.required],
            'job_title': [''],       
        });
}
}