import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { ResumeService } from '../../../../shared/services/resume.service';
import { EducationService } from '../../../../shared/services/education.service';
import { WorkExperienceService } from '../../../../shared/services/workexperience.service';
import { JobseekerInformationService } from '../../../../shared/services/jobseeker_informatin.service';
import { TrainingService } from '../../../../shared/services/training.service';
import { AppliedJobService } from '../../../../shared/services/applied-job.service';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css'],
  animations: [routerTransition()]
})
export class ViewResumeComponent implements OnInit {
  public serverPath = ServerBasePath.serverPath;

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
    private resumeService:ResumeService,
    private  educationService:EducationService,
    private workexperience: WorkExperienceService,
    private informationDetails: JobseekerInformationService,
    private trainingService:TrainingService,

  ) { }

  ngOnInit() {

    this.userId= localStorage.getItem('userId');
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
  this.informationDetails.getSinglePersonalDetails(this.userId).subscribe((res) => {
    this.personalDetails = res["original"];

});

  
//get all training 
this.trainingService.getAllTrainingDetails().subscribe(res => {
    this.trainingDetails = res["original"]["trainings"];
  });
  }

}
