import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthJobDetailsComponent } from './auth-job-details.component';

describe('AuthJobDetailsComponent', () => {
  let component: AuthJobDetailsComponent;
  let fixture: ComponentFixture<AuthJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
