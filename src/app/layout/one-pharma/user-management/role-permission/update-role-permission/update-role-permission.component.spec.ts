import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { UpdateRolePermissionComponent } from './update-role-permission.component'
import { UpdateRolePermissionModule } from './update-role-permission.module'

describe('ChartsComponent', () => {
  let component: UpdateRolePermissionComponent
  let fixture: ComponentFixture<UpdateRolePermissionComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          UpdateRolePermissionModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRolePermissionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
