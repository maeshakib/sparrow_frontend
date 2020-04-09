import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJobShortlistCvComponent } from './single-job-shortlist-cv.component';

describe('SingleJobShortlistCvComponent', () => {
  let component: SingleJobShortlistCvComponent;
  let fixture: ComponentFixture<SingleJobShortlistCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleJobShortlistCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleJobShortlistCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
