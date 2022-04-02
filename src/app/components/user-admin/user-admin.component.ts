import { Component, HostListener, OnInit } from '@angular/core';
import { UserWithDetailsAndRolesDto } from 'src/app/models/userWithDetailsAndRolesDto';
import { UserService } from 'src/app/services/user.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { WindowSizeService } from 'src/app/services/window-size.service';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimsService } from 'src/app/services/operation-claims.service';
import { UserOperationClaimWithAttemptingUserIdDto } from 'src/app/models/userOperationClaimWithAttemptingUserIdDto'
import { AuthService } from 'src/app/services/auth.service';
import { DeleteForAdminWithAttemptingUserIdDto } from 'src/app/models/deleteFordminWithAttemptingUserIdDto';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  public classDiv1:string;
  public classDiv2:string;
  public userMailForSearch:string = "";
  public userNameLastNameForSearch:string = "";
  public searchByRoleText:string = "Seçiniz..."
  public userWithDetailsAndRolesDto: UserWithDetailsAndRolesDto[] = []
  public currentUser:UserWithDetailsAndRolesDto = {} as UserWithDetailsAndRolesDto;
  public userOperaitonClaimDto:UserOperationClaimDto[] = []
  public rolesInSystem:OperationClaim[] = []
  public rolesInSystemForSearch:string[] = []
  public loaded:boolean = false;
  public isItAddRole:boolean = false;
  public isItDeleteRole:boolean = false;
  public authorizedUserId:number;

  constructor(private windowSizeService:WindowSizeService,
               private userService:UserService, 
               private userOperationClaimService:UserOperationClaimService,
               private toastrService:ToastrService,
               private operationClaimsService:OperationClaimsService,
               private authService:AuthService
             ) { }

  ngOnInit(): void {
    this.divColSetter()
    this.getUsersDetailWithRoles()
    this.getRolesInSystem()
    this.getAuthorizedUserIdAsAttemptingUser()
  }

  getAuthorizedUserIdAsAttemptingUser(){
    this.authorizedUserId = this.userService.authenticatedUserDetails.getValue().userId
  }
  
  getRolesInSystem(){
    this.operationClaimsService.getRolesInSystem().subscribe(response=>{
      this.rolesInSystem = response.data
      this.getRolesInSystemForSearch()
    })
  }

  getRolesInSystemForSearch(){
    this.rolesInSystem.forEach(element => {
      if (element.name != "user") {
        this.rolesInSystemForSearch.push(element.name)
      }
    });
  }

  addRoleToUser(){
    let selectedRoleId = document.getElementById("roleSelectForAdd") as HTMLInputElement
    let currentUserId:number = this.currentUser.userId;
    let userOperationClaimToAddWithAttemptingUserId:UserOperationClaimWithAttemptingUserIdDto = {} as UserOperationClaimWithAttemptingUserIdDto
    userOperationClaimToAddWithAttemptingUserId.operationClaimId = parseInt(selectedRoleId.value);
    userOperationClaimToAddWithAttemptingUserId.userId = currentUserId;  
    userOperationClaimToAddWithAttemptingUserId.attemptingUserId = this.authorizedUserId  
    this.userOperationClaimService.add(userOperationClaimToAddWithAttemptingUserId).subscribe(response=>{
      if (this.authorizedUserId == currentUserId) {
        this.toastrService.success("Yetki hesabınıza başarıyla eklendi. Yetkinin etkin olabilmesi için lütfen sisteme yeniden giriş yapınız.","Başarılı")
        this.authService.logOut()
      }else{
        this.toastrService.success(response.message,"Başarılı")
        this.getUsersDetailWithRoles()
      }      
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Hata")
    })
  }
    
  deleteRoleFromUser(){
    let userOperationClaimToDeleteWithAttemptingUserId:UserOperationClaimWithAttemptingUserIdDto = {} as UserOperationClaimWithAttemptingUserIdDto
    let selectedUserOperationClaimId = document.getElementById("roleSelectForDelete") as HTMLInputElement
    userOperationClaimToDeleteWithAttemptingUserId.id = parseInt(selectedUserOperationClaimId.value)
    userOperationClaimToDeleteWithAttemptingUserId.attemptingUserId = this.authorizedUserId
    this.userOperationClaimService.delete(userOperationClaimToDeleteWithAttemptingUserId).subscribe(response=>{
      if (this.authorizedUserId == this.currentUser.userId) {
        this.toastrService.success("Yetki hesabınızdan başarıyla silindi. Sistemi kullanabilmek için lütfen tekrar giriş yapınız.","Başarılı")
        this.authService.logOut()
      }else{
        this.toastrService.success(response.message,"Başarılı")
        this.getUsersDetailWithRoles()
        this.getUserOperaionClaimWithIdAndName(this.currentUser)
      }      
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Hata")
    })
  }

  deleteUserForAdmin(){ 
    let deleteForAdminWithAttemptingUserId:DeleteForAdminWithAttemptingUserIdDto = {} as DeleteForAdminWithAttemptingUserIdDto
    deleteForAdminWithAttemptingUserId.userId = this.currentUser.userId
    deleteForAdminWithAttemptingUserId.attemptingUserId = this.authorizedUserId
    this.userService.deleteForAdmin(deleteForAdminWithAttemptingUserId).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.cancelAddOrDelete()
      this.getUsersDetailWithRoles()
      if (this.currentUser.userId == this.authorizedUserId) {
        this.authService.logOut()
      }
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Hata")
    })
  }  

  setCurrentUser(activeUser:UserWithDetailsAndRolesDto){
    this.currentUser = activeUser
  }

  getUsersDetailWithRoles(){
    // kullanıcı tablosunu dolduran tüm kullanıcıları ve rollerini getiren metod userId içerir.
    this.userService.getAllUsersWithUserAndRoleDetailsDto().subscribe(response=>{
      this.userWithDetailsAndRolesDto = response.data
      this.loaded = true
    })
  }

  getUserOperaionClaimWithIdAndName(activeUser:UserWithDetailsAndRolesDto){
    // kullanıcı idsine göre kullanıcının sahip olduğu roller selectboxını dolduruyor. userOperaitonClaim in id sini ve operationClaim'in name ini döndürüyor. Name selectbox da görüntülenmesi için userOperationClaim in id si ise kullanıcıdan bunu silmek için gerekli.
    this.userOperationClaimService.getAuthenticatedUserRolesDto(activeUser.userId).subscribe(response=>{
      this.userOperaitonClaimDto = response.data
      this.setDeleteRole(activeUser)
    }) 
  }

  setAddRole(activeUser:UserWithDetailsAndRolesDto){
    this.isItAddRole = true
    this.isItDeleteRole = false;
    this.setCurrentUser(activeUser)
    this.scrollToTop()
  }

  setDeleteRole(activeUser:UserWithDetailsAndRolesDto){
    this.isItDeleteRole = true;
    this.isItAddRole = false;
    this.setCurrentUser(activeUser)
    this.scrollToTop()
  }

  cancelAddOrDelete(){
    this.isItAddRole = false;
    this.isItDeleteRole = false;
  }

  @HostListener('window:resize', ['$event'])
  divColSetter() {
    let screenSize = this.windowSizeService.divColDecider(window.innerWidth);
    this.classDiv1 = screenSize.class1;
    this.classDiv2 = screenSize.class2;
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  clearSearchArea(){
    this.userMailForSearch = ''
    this.userNameLastNameForSearch = ''
    this.searchByRoleText = 'Seçiniz...'
  }

}
