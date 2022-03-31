import { Component, HostListener, OnInit } from '@angular/core';
import { UserWithDetailsAndRolesDto } from 'src/app/models/userWithDetailsAndRolesDto';
import { UserService } from 'src/app/services/user.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { WindowSizeService } from 'src/app/services/window-size.service';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimsService } from 'src/app/services/operation-claims.service';
import { UserOperationClaim } from 'src/app/models/userOperationClaim'
import { AuthService } from 'src/app/services/auth.service';

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
  public userWithDetailsAndRolesDto: UserWithDetailsAndRolesDto[] = []
  public currentUser:UserWithDetailsAndRolesDto = {} as UserWithDetailsAndRolesDto;
  public userOperaitonClaimDto:UserOperationClaimDto[] = []
  public rolesInSystem:OperationClaim[] = []
  public loaded:boolean = false;
  public isItAddRole:boolean = false;
  public isItDeleteRole:boolean = false;

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
  }
  
  getRolesInSystem(){
    this.operationClaimsService.getRolesInSystem().subscribe(response=>{
      this.rolesInSystem = response.data
    })
  }

  addRoleToUser(){
    let selectedRoleId = document.getElementById("roleSelectForAdd") as HTMLInputElement
    let currentUserId:number = this.currentUser.userId;
    let userOperationClaimToAdd:UserOperationClaim = {} as UserOperationClaim
    userOperationClaimToAdd.operationClaimId = parseInt(selectedRoleId.value);
    userOperationClaimToAdd.userId = currentUserId;    
    this.userOperationClaimService.add(userOperationClaimToAdd).subscribe(response=>{
      if (this.userService.authenticatedUserDetails.getValue().userId == currentUserId) {
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
    let userOperaitonClaimToDelete:UserOperationClaim = {} as UserOperationClaim
    let selectedUserOperationClaimId = document.getElementById("roleSelectForDelete") as HTMLInputElement
    userOperaitonClaimToDelete.id = parseInt(selectedUserOperationClaimId.value)
    this.userOperationClaimService.delete(userOperaitonClaimToDelete).subscribe(response=>{
      if (this.userService.authenticatedUserDetails.getValue().userId == this.currentUser.userId) {
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
    this.userService.deleteForAdmin(this.currentUser.userId).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.getUsersDetailWithRoles()
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

}
