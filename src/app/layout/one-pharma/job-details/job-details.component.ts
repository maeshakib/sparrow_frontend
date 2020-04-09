import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path';
import { JobPostService } from '../../../shared/services/job-post.service';
import { DataCommunicationService } from '../../../shared/services/data-communication.service';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
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
  ) { }

  ngOnInit() {
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

}
