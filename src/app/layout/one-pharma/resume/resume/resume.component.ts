import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../../../shared/services/resume.service';
import { EducationService } from '../../../../shared/services/education.service';
import { WorkExperienceService } from '../../../../shared/services/workexperience.service';
import { JobseekerInformationService } from '../../../../shared/services/jobseeker_informatin.service';
import { TrainingService } from '../../../../shared/services/training.service';
import { AppliedJobService } from '../../../../shared/services/applied-job.service';
import { DatePipe } from '@angular/common';





import { routerTransition } from '../../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerBasePath } from '../../../../shared/Server-Base-Path/server-path';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  animations: [routerTransition()],
  providers:[DatePipe]

})



@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  public getInitData: Object = {
    plugins: ['autolink', 'lists', 'link', 'image', 'imagetools', 'charmap', 'print', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'contextmenu'],
   
    
};



public userId;
fileToUploadImage: File = null;
public startDate;
public endDate;

public maritalStatus;
public tyeOfBusiness;
public yesNo;
public contractType;
public trainingMethodology;
public levelOfEducation;
  public resErrors;
  public addForm;
  public addFormEducation;
  public addFormWorkExperience;
  public addFormPersonalDetails;
  public addFormTraining;
  public fUploadForm;
  public photoUploadForm;
  public updateForm;
  public updateEduForm;
  public updatePersonalDetailsForm;
  public updateWorkExpForm;
  public updateTrainingForm;
  public submitted=false;
  public allReferences;
  public allEducations;  
  public allWorkExperiences;
  public personalDetails;
  public trainingDetails;
  public referenceId;
  public department;
  public closeResult;
  public modalRef: NgbModalRef;
  public getjobId;
  loginForm: FormGroup;
  public uploadedImageUrl = null;
  private base64textString: String = "";
public category
fileToUpload: File = null;


public page;
  constructor(
    private resumeService:ResumeService,
    private  educationService:EducationService,
    private workexperience: WorkExperienceService,
    private informationDetails: JobseekerInformationService,
    private trainingService:TrainingService,
    private appliedJobService: AppliedJobService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,  
    private datepipe: DatePipe,

  ) { }

  ngOnInit() {
    this.yesNo=[    
      {    
        "id": 0,    
        "name": "No"    
      },    
      {    
        "id": 1,    
        "name": "Yes"    
      }
    ];  

    this.contractType=[    
      {    
        "id": 1,    
        "name": "Fixed Term"    
      },    
      {    
        "id": 2,    
        "name": "Indefinite"    
      },    
      {    
        "id": 3,    
        "name": "Temporary Appointment"    
      } , 
      {    
        "id": 4,    
        "name": "Other Arrangement"    
      } 
    ];  




    this.maritalStatus=[    
      {    
        "id": 1,    
        "name": "Married"    
      },    
      {    
        "id": 2,    
        "name": "Single"    
      },    
      {    
        "id": 3,    
        "name": "Divorced"    
      } , 
      {    
        "id": 4,    
        "name": "Common Law"    
      } ,      {    
        "id": 5,    
        "name": "Registered Partnership"    
      } ,      {    
        "id": 6,    
        "name": "Separated"    
      } ,      {    
        "id": 7,    
        "name": "Widowed"    
      } 
    ];    


    this.tyeOfBusiness=[    
      {    
        "id": 1,    
        "name": "Governmental Organization"    
      },    
      {    
        "id": 2,    
        "name": "International Organization"    
      },    
      {    
        "id": 3,    
        "name": "Non-Governmental Organization"    
      } , 
      {    
        "id": 4,    
        "name": "Private Sector"    
      } ,      {    
        "id": 5,    
        "name": "Other"    
      } 
    ];
    
     

    this.trainingMethodology=[    
      {    
        "id": 1,    
        "name": "Assessment"    
      },    
      {    
        "id": 2,    
        "name": "Blended Learning Programme"    
      },    
      {    
        "id": 3,    
        "name": "Mobile"    
      } , 
      {    
        "id": 4,    
        "name": "Resource Material"    
      } ,      {    
        "id": 5,    
        "name": "Webinar"    
      } ,      {    
        "id": 6,    
        "name": "Workshop"    
      } ,      
      {    
        "id": 7,    
        "name": "Workshop for Blended Learning"    
      } ,
      { "id": 8,    
        "name": "Training Video"    
      } ,
    { "id": 9,    
      "name": "eLearning"    
    } 
    ];    

    this.levelOfEducation=[    
      {    
        "id": 1,    
        "name": "Elementary School Completed"    
      },    
      {    
        "id": 2,    
        "name": "Some High School"    
      },    
      {    
        "id": 3,    
        "name": "High School Graduate"    
      } , 
      {    
        "id": 4,    
        "name": "Bachelor"    
      } ,      {    
        "id": 5,    
        "name": "Masters Degree"    
      } ,      {    
        "id": 6,    
        "name": "No Formal Education"    
      } ,      
      {    
        "id": 7,    
        "name": "Other (please specify in Comments)"    
      } 
    ];  

console.log(this.tyeOfBusiness);

   this.userId= localStorage.getItem('userId');

//     localStorage.getItem('currentRoute');
//     this.getjobId =   localStorage.getItem('currentRoute').split("/").pop();

// console.log(this.getjobId);
   
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }


    this.initiatefileUploadForm();
    this.initiatephotoUploadForm();

    this.initiateAddForm();
    this.initiateAddFormEducation();
    this.initiateAddFormWorkExperience();
    this.initiateAddPersonalDetails();
    this.initiateTraining();

//get all references
    this.resumeService.getAllReferences().subscribe(res => {
      
      this.allReferences = res["original"]["references"];
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
    console.log(this.personalDetails);
    // if(this.personalDetails['p11form'] == null)
    // {
    //   this.personalDetails['p11form']=0;
    // }

});

  
//get all training 
this.trainingService.getAllTrainingDetails().subscribe(res => {
    this.trainingDetails = res["original"]["trainings"];
  });

  }
 

  initiatefileUploadForm(){
    this.fUploadForm = this.fb.group({
      'user_id': [this.userId],
          
  });
  }
  initiatephotoUploadForm(){
    this.photoUploadForm = this.fb.group({
      'user_id': [this.userId],
          
  });  
  }

  initiateAddForm() { 
    this.addForm = this.fb.group({
        'name': ['', Validators.required],
        'title': ['', Validators.required],
        'employer': ['', Validators.required],
        'email': ['', Validators.required],
        'address': [''],       
    });
}
initiateAddFormEducation() { 
  this.addFormEducation = this.fb.group({
      'degree_title': ['', Validators.required],
      // 'begin_date': ['', Validators.required],
      // 'end_date': ['', Validators.required],
      'level_of_education': ['', Validators.required],
      'school_name': ['', Validators.required],   
      'education_completed': ['', ],  
      'topics_of_study': ['',],
    
  });
}

initiateAddFormWorkExperience() { 
  this.addFormWorkExperience = this.fb.group({
      'employer_name': ['', Validators.required],
      'job_title': ['', Validators.required],
      'description_of_duties': [''],
      //  'start_date': [''],
      //  'end_date': [''],
      'country_name': ['' ],
      'type_of_business	': [''],
      'un_experience': ['' ],
      'unhcr_experience': ['' ],
      'contract_type': ['' ],
      'un_unhcr_grade': ['' ],
      'msrp_id': ['' ],
      'index_id': [''],
      'type_of_business': ['']
  
  });
}

initiateAddPersonalDetails() { 
    this.addFormPersonalDetails = this.fb.group({
        'first_name': ['', Validators.required],
        'middle_name': [''],
        'last_name': ['' ],
        'maiden_name': [''],
        'date_of_b': ['', Validators.required],
        'marital_status': ['', Validators.required],
        'nationalities_at_birth': ['', Validators.required],
        'current_nationalities': ['', Validators.required],
        'permanent_residency': ['', Validators.required],
        'gender': ['', Validators.required],
        'mobile_no': ['', Validators.required],

        

    });
  }

  initiateTraining(){
  this.addFormTraining = this.fb.group({
        'course_title': ['', Validators.required],
        'school_name': ['',Validators.required],
        'country': ['' ],
        'topic_area': [''],
        'training_methodology': [''],
        'course_description': [''],           

    });
  }

//edit Training end here

initiateTrainingUpdateForm(data) {

  const sdate = new Date(data.course_start_date);
  const edate = new Date(data.course_end_date);
  this.startDate = { day: sdate.getUTCDate(), month: sdate.getUTCMonth() + 1, year: sdate.getUTCFullYear() };
  this.endDate = { day: edate.getUTCDate(), month: edate.getUTCMonth() + 1, year: edate.getUTCFullYear() };

  this.updateTrainingForm = this.fb.group({    
    'course_title': [data.course_title, Validators.required],
    'school_name': [data.school_name,Validators.required],
    'country': [data.country,'' ],    
    'topic_area': [data.topic_area,],
    'training_methodology': [data.training_methodology,''],
    'course_description': [data.course_description,''],  
    
    
     });


}
//edit Training end here


createModal(create) {
  this.modalRef = this.modalService.open(create, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

// createModal_education(create) {
//   this.modalRef = this.modalService.open(create, { size: 'lg', backdrop: 'static' });
//   this.modalRef.result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }



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
get formedu() { return this.addFormEducation.controls; }
get formworkExp() { return this.addFormWorkExperience.controls; }
get formPersonalDetails() { return this.addFormPersonalDetails.controls; }
get formTraining() { return this.addFormTraining.controls; }



createReference(formdata, isValid) {     
  this.submitted = true;       
  if (isValid) {

      this.resumeService.saveReference(formdata).subscribe(res => {
          if (res["original"].success) {
              this.modalRef.close();
              this.toastr.success('Reference Successfully Saved');
              this.router.navigate(['/resume']);
          }
          else {
              this.resErrors = res['errors'];
              this.toastr.error('Reference Saved Failed');
          }
      });
  }
}
//end create Reference


 //edit start here
 editModal(update, id) {

  this.resumeService.getReference(id).subscribe((res) => {
    //  this.reference = res["original"];
      this.initiateUpdateForm(res["original"]);
     
      this.referenceId = id;
  });
  this.modalRef = this.modalService.open(update, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
//edit end here


initiateUpdateForm(data) {
  this.updateForm = this.fb.group({
      'reference_name': [data.reference_name, Validators.required],
      'title': [data.title, Validators.required],
      'employer': [data.employer, Validators.required],
      'email_address': [data.email_address, Validators.required],
      
      'address_line_one': [data.address_line_one, Validators.required],
     });
}



//update start here
// convenience getter for easy access to form fields
get updateform() { return this.updateForm.controls; }
updateReference(formdata, isValid) {
  this.submitted = true;
  if (isValid) {
  
      this.resumeService.updateReference(formdata,this.referenceId).subscribe(res => {
          if (res["original"].success == true) {
              this.toastr.success('Reference Successfully Updated');
              this.modalRef.close();
              this.router.navigate(['/resume']);
          } else {
              this.resErrors = res["original"].errors;
              this.toastr.error('Reference Update Failed');
          }

      });
  }
}
//update end here


/////////////////////////////////////education start////////////////////////////////////
//start create Education
createEducation(formdata, isValid) {    
  console.log(
'here'
  )
  this.submitted = true;       

  const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
        const endDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day);
        const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
        const formatEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
        formdata["begin_date"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');
        formdata["end_date"] = this.datepipe.transform(formatEndDate, 'yyyy-MM-dd');


  if (isValid) {

      this.educationService.saveEducation(formdata).subscribe(res => {
          if (res["original"].success) {
              this.modalRef.close();
              this.toastr.success('Education Successfully Saved');
              this.router.navigate(['/resume']);
          }
          else {
              this.resErrors = res['errors'];
              this.toastr.error('Education Saved Failed');
          }
      });
  }
}
//end create Education


 //edit education start here
 editEducationModal(updateEducation, id) {

  this.educationService.getEducation(id).subscribe((res) => {
      this.initiateEducationUpdateForm(res["original"]);
     
      this.referenceId = id;
  });
  this.modalRef = this.modalService.open(updateEducation, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

initiateEducationUpdateForm(data) {

  const sdate = new Date(data.begin_date);
  const edate = new Date(data.end_date);
  this.startDate = { day: sdate.getUTCDate(), month: sdate.getUTCMonth() + 1, year: sdate.getUTCFullYear() };
  this.endDate = { day: edate.getUTCDate(), month: edate.getUTCMonth() + 1, year: edate.getUTCFullYear() };



  this.updateEduForm = this.fb.group({
      'degree_title': [data.degree_title, Validators.required],
      'level_of_education': [data.level_of_education, Validators.required],
      'school_name': [data.school_name, Validators.required],
      'education_completed': [data.education_completed],
      'topics_of_study': [data.topics_of_study],
     });
}
//edit education end here

initiatePersonalDetailsUpdateForm(data) {

  const sdate = new Date(data.date_of_b);
  this.startDate = { day: sdate.getUTCDate(), month: sdate.getUTCMonth() + 1, year: sdate.getUTCFullYear() };

  this.updatePersonalDetailsForm = this.fb.group({      
    'first_name': [data.first_name, Validators.required],
    'middle_name': [data.middle_name],
    'last_name': [data.last_name],
    'maiden_name': [data.maiden_name],  
    'marital_status': [data.marital_status, Validators.required],
    'nationalities_at_birth': [data.nationalities_at_birth, Validators.required],
    'current_nationalities': [data.current_nationalities ],
    'permanent_residency': [data.permanent_residency ],
    'mobile_no': [data.mobile_no, Validators.required],
    
     });


}
//edit education end here



//update education start here
// convenience getter for easy access to form fields
get updateEduform() { return this.updateEduForm.controls; }
updateEducationF(formdata, isValid) {
  this.submitted = true;

  const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
  const endDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day);
  const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
  const formatEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
  formdata["begin_date"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');
  formdata["end_date"] = this.datepipe.transform(formatEndDate, 'yyyy-MM-dd');


  if (isValid) {
  
      this.educationService.updateEducation(formdata,this.referenceId).subscribe(res => {
          if (res["original"].success == true) {
              this.toastr.success('Education Successfully Updated');
              this.modalRef.close();
              this.router.navigate(['/resume']);
          } else {
              this.resErrors = res["original"].errors;
              this.toastr.error('Education Update Failed');
          }

      });
  }
}
//update education end here
/////////////////////////////////////education end////////////////////////////////////


//////////////////////////////////// Work Experience start //////////////////////////
//start work experience
createWorkExperience(formdata, isValid) {    
  this.submitted = true;    
        const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
        const endDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day);
        const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
        const formatEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
        formdata["start_date"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');
        formdata["end_date"] = this.datepipe.transform(formatEndDate, 'yyyy-MM-dd');   
  if (isValid) {

      this.workexperience.saveWorkExperience(formdata).subscribe(res => {
          if (res["original"].success) {
              this.modalRef.close();
              this.toastr.success('Work Experience Successfully Saved');
              this.router.navigate(['/resume']);
          }
          else {
              this.resErrors = res['errors'];
              this.toastr.error('Work Experience Saved Failed');
          }
      });
  }
}
//end create Education


 //edit work experience start here
 editWorkExperienceModal(updateEducation, id) {
  this.workexperience.getWorkExperience(id).subscribe((res) => {
      this.initiateWorkExperienceUpdateForm(res["original"]);
     
      this.referenceId = id;
  });
  this.modalRef = this.modalService.open(updateEducation, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}



initiateWorkExperienceUpdateForm(data) {
  const sdate = new Date(data.start_date);
  const edate = new Date(data.end_date);
  this.startDate = { day: sdate.getUTCDate(), month: sdate.getUTCMonth() + 1, year: sdate.getUTCFullYear() };
  this.endDate = { day: edate.getUTCDate(), month: edate.getUTCMonth() + 1, year: edate.getUTCFullYear() };



  this.updateWorkExpForm = this.fb.group({
      'employer_name': [data.employer_name, Validators.required],
      'job_title': [data.job_title, Validators.required],  
      'description_of_duties': [data.description_of_duties],
      // 'start_date': [data.start_date],
      // 'end_date': [data.end_date],
      'country_name': [data.country_name],
      'type_of_business	': [data.type_of_business],
      'un_experience': [data.un_experience],
      'unhcr_experience': [data.unhcr_experience],
      'contract_type': [data.contract_type],
      'un_unhcr_grade': [data.un_unhcr_grade],
      'msrp_id': [data.msrp_id],
      'index_id': [data.index_id],
      'type_of_business': [data.type_of_business]   
     });
}
//edit  work experience end here
//update education start here
// convenience getter for easy access to form fields
get updateWorkExpform() { return this.updateWorkExpForm.controls; }
updateWorkExperienceF(formdata, isValid) {
  this.submitted = true;

  const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
  const endDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day);
  const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
  const formatEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
  formdata["start_date"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');
  formdata["end_date"] = this.datepipe.transform(formatEndDate, 'yyyy-MM-dd');

  if (isValid) {
  
      this.workexperience.updateWorkExperience(formdata,this.referenceId).subscribe(res => {
          if (res["original"].success == true) {
              this.toastr.success('Work Experience Successfully Updated');
              this.modalRef.close();
              this.router.navigate(['/resume']);
          } else {
              this.resErrors = res["original"].errors;
              this.toastr.error('Work Experience Update Failed');
          }

      });
  }
}
//update education end here
/////////////////////////////////// Work Experience end /////////////////////////////

/////////////////////////////////// Personal details start /////////////////////////////
//start personal details create
createPersonalDetails(formdata, isValid) {    
  this.submitted = true;       
  if (isValid) {

      this.informationDetails.savePersonalDetails(formdata).subscribe(res => {
          if (res["original"].success) {
              this.modalRef.close();
              this.toastr.success('Personal Details Successfully Saved');
              this.router.navigate(['/resume']);
          }
          else {
              this.resErrors = res['errors'];
              this.toastr.error('Personal Details Saved Failed');
          }
      });
  }
}
//end create parsonal details

 //edit PersonalDetails start here
 editPersonalDetails(updatePersonalDetails, id) {
  this.informationDetails.getSinglePersonalDetails(id).subscribe((res) => {
  this.initiatePersonalDetailsUpdateForm(res["original"]);
     
      this.referenceId = id;
  });
  this.modalRef = this.modalService.open(updatePersonalDetails, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

//end edit personal deatils
//update PersonalDetails start here
// convenience getter for easy access to form fields
get updatePersonalDetailsform() { return this.updatePersonalDetailsForm.controls; }
updatePersonalDetailsF(formdata, isValid) {
  console.log('here');
  console.log(formdata);

  this.submitted = true;
  const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
  const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
  formdata["date_of_b"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');

  if (isValid) {
  
      this.informationDetails.updatePersonalDetails(formdata,this.referenceId).subscribe(res => {
          if (res["original"].success == true) {
              this.toastr.success('Personal Details Successfully Updated');
              this.modalRef.close();
              this.router.navigate(['/resume']);
          } else {
              this.resErrors = res["original"].errors;
              this.toastr.error('Work Experience Update Failed');
          }

      });
  }
}
//update PersonalDetails end here
//start Training  create
createTraining(formdata, isValid) {  
  
  const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
  const endDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day);
  const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
  const formatEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
  formdata["course_start_date"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');
  formdata["course_end_date"] = this.datepipe.transform(formatEndDate, 'yyyy-MM-dd');


    this.submitted = true;       
    if (isValid) {
  
        this.trainingService.saveTraining(formdata).subscribe(res => {
            if (res["original"].success) {
                this.modalRef.close();
                this.toastr.success('Training Details Successfully Saved');
                this.router.navigate(['/resume']);
            }
            else {
                this.resErrors = res['errors'];
                this.toastr.error('Training Details Saved Failed');
            }
        });
    }
  }
  //end create Training







 //edit Training start here
 editTraining(updateTraining, id) {
  this.trainingService.getTrainingDetails(id).subscribe((res) => {
  this.initiateTrainingUpdateForm(res["original"]);
     
      this.referenceId = id;
  });
  this.modalRef = this.modalService.open(updateTraining, { size: 'lg', backdrop: 'static' });
  this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

//end edit Training deatils
/////////////////////////////////// Training  end /////////////////////////////

//update education start here
// convenience getter for easy access to form fields
get updateTrainingform() { return this.updateTrainingForm.controls; }
updateTrainingFun(formdata, isValid) {
  this.submitted = true;
  const startDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day);
  const endDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day);
  const formatStartDate = this.datepipe.transform(startDate, 'yyyy-MM-dd');
  const formatEndDate = this.datepipe.transform(endDate, 'yyyy-MM-dd');
  formdata["course_start_date"] = this.datepipe.transform(formatStartDate, 'yyyy-MM-dd');
  formdata["course_end_date"] = this.datepipe.transform(formatEndDate, 'yyyy-MM-dd');


  if (isValid) {
  
      this.trainingService.updateTrainingDetails(formdata,this.referenceId).subscribe(res => {
          if (res["original"].success == true) {
              this.toastr.success('Training Successfully Updated');
              this.modalRef.close();
              this.router.navigate(['/resume']);
          } else {
              this.resErrors = res["original"].errors;
              this.toastr.error('Training Update Failed');
          }

      });
  }
}
//update education end here




//attachment start here


get fUploadform() { return this.fUploadForm.controls; }

uploadFile(formdata, isValid) {
  
  // formdata["photo"] = this.uploadedImageUrl;

  if (isValid) {
      this.informationDetails.uploadAttachment(formdata, this.fileToUpload).subscribe(res => {
          if (res["success"]) {
              this.router.navigate(['/knowledge']);
          }
      });
  }
}




_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
  this.base64textString = btoa(binaryString);
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
//attachment end here


get photoUploadform() { return this.photoUploadForm.controls; }

uploadFilePhoto(formdata, isValid) {
  
  // formdata["photo"] = this.uploadedImageUrl;

  if (isValid) {
      this.informationDetails.uploadAttachmentPhoto(formdata, this.fileToUploadImage).subscribe(res => {
          if (res["success"]) {
              this.router.navigate(['/knowledge']);
          }
      });
  }
}
handleFileInputImage(event) {
  if (event.target.files && event.target.files[0]) {
      this.fileToUploadImage = event.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
          this.uploadedImageUrl = event.target["result"];
      }
  }
}




}
