import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJobAllCvComponent } from './single-job-all-cv.component';

describe('SingleJobAllCvComponent', () => {
  let component: SingleJobAllCvComponent;
  let fixture: ComponentFixture<SingleJobAllCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleJobAllCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleJobAllCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
