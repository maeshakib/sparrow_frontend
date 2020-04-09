import { Component, OnInit } from '@angular/core';
import { JobPostService } from '../../../shared/services/job-post.service';


import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  public allJobs;

  constructor(
    private JobService :JobPostService,   
    public router: Router, 

    ) { }


  ngOnInit() 
  {

    this.JobService.getAllJobs().subscribe(res => {       
      this.allJobs = res["all_jobs"];
  });
  }

}
