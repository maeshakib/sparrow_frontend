import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { NotificationMessageComponent } from './notification-message.component'
import { NotificationMessageModule } from './notification-message.module'

describe('NotificationMessageComponent', () => {
  let component: NotificationMessageComponent
  let fixture: ComponentFixture<NotificationMessageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotificationMessageModule, RouterTestingModule],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
