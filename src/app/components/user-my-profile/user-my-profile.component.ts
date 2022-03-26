import { Component, OnInit } from '@angular/core';
import { UserWithDetailsAndRolesDto } from 'src/app/models/userWithDetailsAndRolesDto';
import { UserDetailsDto } from 'src/app/models/userDetailsDto'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-my-profile',
  templateUrl: './user-my-profile.component.html',
  styleUrls: ['./user-my-profile.component.css']
})
export class UserMyProfileComponent implements OnInit {

  public currentUserUserWithDetailsAndRolesDto:UserWithDetailsAndRolesDto = {} as UserWithDetailsAndRolesDto
  public loaded:boolean = false;
  public updateUserForm:FormGroup;

  constructor(
    private userService:UserService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUserDetailsAndRoles() 
    this.createUpdateUserForm()   
  }

  getCurrentUserDetailsAndRoles(){
    let authenticatedUser:UserDetailsDto = this.userService.authenticatedUserDetails.getValue();
    this.userService.getUserDetailsWithRolesByUserIdDto(authenticatedUser.userId).subscribe(response=>{
      this.currentUserUserWithDetailsAndRolesDto = response.data
      this.createUpdateUserForm()
      this.loaded = true;
    })
  }

  createUpdateUserForm(){
    this.updateUserForm = this.formBuilder.group({
      newEmail:[this.currentUserUserWithDetailsAndRolesDto.email,[Validators.required, Validators.pattern(ProjectRegexes.email)]],
      currentPassword:['',[Validators.required]],
      newPassword:['',[Validators.required]],
      firstName:[this.currentUserUserWithDetailsAndRolesDto.firstName,[Validators.required,Validators.minLength(3),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]],
      lastName:[this.currentUserUserWithDetailsAndRolesDto.lastName,[Validators.required,Validators.minLength(2),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]]
    })
  }

  updateUser(){
    console.log("updatettim :)")
  }

  deleteMyAccount(){
    console.log("sildim.")
    //login e gönder ( aslında zaten kendiliğinden gider)
  }

  cancelUpdate(){
    this.router.navigate(['/userlibrary'])
  }

  get updateUserNewEmail(){
    return this.updateUserForm.get('newEmail')
  }
  get updateUserCurrentPassword(){
    return this.updateUserForm.get('currentPassword')
  }
  get updateUserNewPassword(){
    return this.updateUserForm.get('newPassword')
  }
  get updateUserFirstName(){
    return this.updateUserForm.get('firstName');
  }
  get updateUserLastName(){
    return this.updateUserForm.get('lastName')
  }
}
