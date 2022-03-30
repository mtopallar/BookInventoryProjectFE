import { Component, OnInit } from '@angular/core';
import { UserWithDetailsAndRolesDto } from 'src/app/models/userWithDetailsAndRolesDto';
import { UserDetailsDto } from 'src/app/models/userDetailsDto'
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-my-profile',
  templateUrl: './user-my-profile.component.html',
  styleUrls: ['./user-my-profile.component.css']
})
export class UserMyProfileComponent implements OnInit {

  public currentUserUserWithDetailsAndRolesDto:UserWithDetailsAndRolesDto = {} as UserWithDetailsAndRolesDto
  public loaded:boolean = false;
  public updateUserForm:FormGroup;
  public confirmPasswordText:string = ""

  constructor(
    private userService:UserService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
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
      currentPassword:['',[Validators.required,Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]],
      newPassword:['',[Validators.required,Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]],
      firstName:[this.currentUserUserWithDetailsAndRolesDto.firstName,[Validators.required,Validators.minLength(3),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]],
      lastName:[this.currentUserUserWithDetailsAndRolesDto.lastName,[Validators.required,Validators.minLength(2),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]]
    })
  }

  updateUser(){
    if (this.updateUserForm.valid) {
      let userForUpdate:UserForUpdateDto = Object.assign({}, this.updateUserForm.value)
      userForUpdate.userId = this.currentUserUserWithDetailsAndRolesDto.userId
      this.userService.updateUser(userForUpdate).subscribe(response=>{
        this.getCurrentUserDetailsAndRoles()
        this.toastrService.success(response.message,"Başarılı")
        this.authService.logOut()
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Hata")
      })     
   }
  }

  deleteMyAccount(){
    console.log("sildim.")
    console.log(this.confirmPasswordText)
    //this.cancelConfirmPassword() ama doğru zamanda.
    //login e gönder ( aslında zaten kendiliğinden gider)
  }

  cancelConfirmPassword(){
    this.confirmPasswordText = ""
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
