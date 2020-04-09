import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AddRolePermissionComponent } from './add-role-permission.component'
import { AddRolePermissionModule } from './add-role-permission.module'

describe('ChartsComponent', () => {
  let component: AddRolePermissionComponent
  let fixture: ComponentFixture<AddRolePermissionComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AddRolePermissionModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolePermissionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
