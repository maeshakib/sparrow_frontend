import { Component, OnInit } from '@angular/core';
import { JobPostService } from '../../../../shared/services/job-post.service';
import { ActivatedRoute,  NavigationEnd } from '@angular/router';


import { ResumeService } from '../../../../shared/services/resume.service';
import { EducationService } from '../../../../shared/services/education.service';
import { WorkExperienceService } from '../../../../shared/services/workexperience.service';
import { JobseekerInformationService } from '../../../../shared/services/jobseeker_informatin.service';
import { TrainingService } from '../../../../shared/services/training.service';
import { AppliedJobService } from '../../../../shared/services/applied-job.service';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

import { routerTransition } from '../../../../router.animations';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-single-job-shortlist-cv',
  templateUrl: './single-job-shortlist-cv.component.html',
  styleUrls: ['./single-job-shortlist-cv.component.css'] ,
  animations: [routerTransition()],
})
export class SingleJobShortlistCvComponent implements OnInit {

  public serverPath = ServerBasePath.serverPath;
  public search:any = '';
  public SingleJobsAllCv: any[]=[];
  public jobId;
  public selectedUserId;
  public selectedJobId
  public modalRef: NgbModalRef;
  closeResult: string;

  public allReferences;
  public allEducations;  
  public allWorkExperiences;
  public personalDetails;
  public trainingDetails;
  public userId;
public arrayOfKeys;
public firstRef;
public secondRef;
public thirdRef;
public firstRname;
public firstROrganization;
public firstRDesignation;
public firstRAddress;
public firstRMobile;
public firstREmail;

public secondRefname;
public secondRefOrganization;
public secondRefDesignation;
public secondRefAddress
public secondRefMobile;
public secondRefEmail;

public thirdRefname;
public thirdRefOrganization;
public thirdRefDesignation;
public thirdRefAddress
public thirdRefMobile;
public thirdRefEmail;

  constructor(
    private jobPostService :JobPostService,
    public router: Router,
    private route: ActivatedRoute,  
    private toastr: ToastrService,
    private modalService: NgbModal,


    private resumeService:ResumeService,
    private  educationService:EducationService,
    private workexperience: WorkExperienceService,
    private informationDetails: JobseekerInformationService,
    private trainingService:TrainingService,
  ) { }

  ngOnInit() {
    this.jobId = this.route.params["value"].jobId;

    this.jobPostService.getSingleJobShortlistCv(this.jobId).subscribe(res => {
      console.log(this.SingleJobsAllCv);
      this.SingleJobsAllCv = res["original"];
  });


   //get all references
   this.resumeService.getAllReferences().subscribe(res => {
      
    this.allReferences = res["original"]["references"];
    //console.log(res["original"]["references"]);
    console.log(this.arrayOfKeys = Object.keys(this.allReferences[0]))
    
this.firstRef = Object.values(this.allReferences[0]);
if(this.firstRef != undefined){

   this.firstRname=this.firstRef[2];
   this.firstROrganization=this.firstRef[4];
   this.firstRDesignation=this.firstRef[3];
   this.firstRAddress=this.firstRef[6];
  
   this.firstREmail=this.firstRef[5];
}
this.secondRef = Object.values(this.allReferences[1]);

if(this.secondRef != undefined){
  this.secondRefname=this.secondRef[2];
  this.secondRefOrganization=this.secondRef[4];
  this.secondRefDesignation=this.secondRef[3];
  this.secondRefAddress=this.secondRef[6]; 
  this.secondRefEmail=this.secondRef[5];

 }

});
//get all educations 
this.educationService.getAllEducations().subscribe(res => {
  this.allEducations = res["original"]["educations"];
});

//get all work experience 
this.workexperience.getAllWorkExperience().subscribe(res => {
this.allWorkExperiences = res["original"]["experiences"];
});

//get all IndividualDetails 
//  this.informationDetails.getPersonalDetails().subscribe(res => {
//     this.personalDetails = res["original"]["personal_details"];
//   });


//get all training 
this.trainingService.getAllTrainingDetails().subscribe(res => {
  this.trainingDetails = res["original"]["trainings"];
});




  }
  //end ngOnInit
  downloadFromServer(filename) {
		this.jobPostService.downloadFile(filename)
			.subscribe(
				data => saveAs(data, filename),
				error => console.error(error)
			);
  }
  

  deleteModal(deleteUser, id) {
    
    this.informationDetails.getSinglePersonalDetails(id).subscribe((res) => {
      this.personalDetails = res["original"];
      console.log(this.personalDetails);
    
    });
     

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


}
