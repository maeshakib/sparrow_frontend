import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostManagementComponent } from './job-post-management.component';

describe('JobPostManagementComponent', () => {
  let component: JobPostManagementComponent;
  let fixture: ComponentFixture<JobPostManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
