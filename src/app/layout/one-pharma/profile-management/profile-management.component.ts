import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { ServerBasePath } from '../../../shared/Server-Base-Path/server-path'

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss'],
  animations: [routerTransition()]
})
export class ProfileManagementComponent implements OnInit {

  updateForm: FormGroup;
  fileToUpload: File = null;
  public userId = null;
  public updateProfileView = false;
  public profileInfo;
  uploadedImageUrl = null;
  existingPhoto;
  public serverPath = ServerBasePath.serverPath;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }


  ngOnInit() {
    this.userId = localStorage.getItem('userid');

    this.getProfileInfo();
  }

  initialUpdateProfile(data) {
    this.existingPhoto = data.photo;
    this.updateForm = this.fb.group({
      'name': [data.name],
      'mobile_no': [data.mobile_no],
      // 'gender': [],
      'national_identification_num': [data.national_identification_num],
      'description': [data.description],
      'address': [data.address],
    });
  }

  getProfileInfo() {
    this.userService.getLoggedUserDetails().subscribe(res => {
      this.profileInfo = res;
      this.initialUpdateProfile(res);
    });
  }
  get form() { return this.updateForm.controls; }

  updateProfile(formdata) {

   // const changedValues = this.getDirtyValues(formdata);

    this.userService.updateUserProfile(formdata).subscribe(res => {
      this.updateProfileView = false;
      this.getProfileInfo();
    });
  }

  // getDirtyValues(form: any) {
  //   let dirtyValues = {};

  //   Object.keys(form.controls)
  //     .forEach(key => {
  //       let currentControl = form.controls[key];

  //       if (currentControl.dirty) {
  //         if (currentControl.controls)
  //           dirtyValues[key] = this.getDirtyValues(currentControl);
  //         else
  //           dirtyValues[key] = currentControl.value;
  //       }
  //     });

  //   return dirtyValues;
  // }

  changeProfileView() {
    this.updateProfileView = true;
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
}