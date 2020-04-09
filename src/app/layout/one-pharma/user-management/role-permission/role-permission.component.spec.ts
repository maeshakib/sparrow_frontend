import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RolePermissionComponent } from './role-permission.component'
import { RolePermissionModule } from './role-permission.module'

describe('ChartsComponent', () => {
  let component: RolePermissionComponent
  let fixture: ComponentFixture<RolePermissionComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RolePermissionModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
