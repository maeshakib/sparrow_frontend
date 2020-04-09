import { Component, OnInit } from '@angular/core';
import { JobPostService } from '../../../../shared/services/job-post.service';
import { ActivatedRoute,  NavigationEnd } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../../../router.animations';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-single-job-all-cv',
  templateUrl: './single-job-all-cv.component.html',
  styleUrls: ['./single-job-all-cv.component.css'] ,
  animations: [routerTransition()],
})
export class SingleJobAllCvComponent implements OnInit {
  public serverPath = ServerBasePath.serverPath;
  public search:any = '';
  public SingleJobsAllCv: any[]=[];
  public jobId;
  public selectedUserId;
  public selectedJobId
  public modalRef: NgbModalRef;
  closeResult: string;


  constructor(
    private jobPostService :JobPostService,
    public router: Router,
    private route: ActivatedRoute,  
    private toastr: ToastrService,
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.jobId = this.route.params["value"].jobId;

    this.jobPostService.getSingleJobAllCv(this.jobId).subscribe(res => {
        console.log(res);
      this.SingleJobsAllCv = res["original"];
  });

  }



  shortListUserModal(deleteUser, userid,jobid) {
 
    this.selectedUserId = userid;
    this.selectedJobId = jobid;

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


shortListUserFunction() {

  this.jobPostService.shortListUser(this.selectedUserId,this.selectedJobId).subscribe(res => {
      console.log(res);
      if (res["original"].success) {
          this.modalRef.close();
          this.toastr.success('User Successfully selected');
      } else {
          this.toastr.error('User selection Failed');
      }
  });
}

}
