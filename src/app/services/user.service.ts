import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetailsDto } from '../models/userDetailsDto';
import { LocalStorageHelperService } from './local-storage-helper.service';
import jwt_decode from "jwt-decode";
import { TokenPayloadModel } from '../models/tokenPayloadModel';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { UserWithDetailsAndRolesDto } from '../models/userWithDetailsAndRolesDto';
import { BaseResponseModel } from '../models/baseResponseModel';
import { UserForUpdateDto } from '../models/userForUpdateDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserForDeleteDto } from '../models/userForDeleteDto';
import { DeleteForAdminWithAttemptingUserIdDto } from '../models/deleteFordminWithAttemptingUserIdDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authenticatedUserDetails:BehaviorSubject<UserDetailsDto> = new BehaviorSubject<UserDetailsDto>(null)

  constructor(private httpClient:HttpClient, private localStorageHelperService:LocalStorageHelperService) { }

  getAuthenticatedUserFromToken(){
    let token = this.localStorageHelperService.getFromLocalStorageWithDecryption("token")
        
    if (token) {
      let readUserFromToken:TokenPayloadModel = jwt_decode(token)
      let authenticatedUser:UserDetailsDto = {
        email : readUserFromToken.email,
        userFullName:readUserFromToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        userId:readUserFromToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        userRoleNames:readUserFromToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      }
      this.authenticatedUserDetails.next(authenticatedUser)
    }
    else{
      this.authenticatedUserDetails.next(null)
    }    
    
  }

  getAllUsersWithUserAndRoleDetailsDto():Observable<ListResponseModel<UserWithDetailsAndRolesDto>>{
    return this.httpClient.get<ListResponseModel<UserWithDetailsAndRolesDto>>(environment.apiUrl+"users/getalluserdetailswithrolesview")
  }

  getUserDetailsWithRolesByUserIdDto(userId:number):Observable<SingleResponseModel<UserWithDetailsAndRolesDto>>{
    return this.httpClient.get<SingleResponseModel<UserWithDetailsAndRolesDto>>(environment.apiUrl+"users/getuserdetailswithrolesbyuserid", {params: new HttpParams().set("userId",userId)})
  }

  deleteForAdmin(deleteForAdminWithAttemptingUserIdDto:DeleteForAdminWithAttemptingUserIdDto):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"users/deleteforadmin",deleteForAdminWithAttemptingUserIdDto)
  }

  
  deleteForUser(userForDeleteDto:UserForDeleteDto):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"users/deleteforuser",userForDeleteDto)
  }

  updateUser(userForUpdateDto:UserForUpdateDto):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"users/update",userForUpdateDto)
  }

  hasUserThisRole(...roleToSearch:string[]):boolean{
    let flag:boolean = false;
    if (this.authenticatedUserDetails!==null) {      
      roleToSearch.forEach(element => {
        if (this.authenticatedUserDetails.getValue().userRoleNames.includes(element)) {
          flag = true
        }                   
      });
    }    
   if (flag) {
     return true;     
   }
   return false;
  }
  
}
//params from object örnek kullanımı

 // getUserDetails(loginModel:LoginModel)
  // :Observable<SingleResponseModel<UserDetailsDto>>{
  //   const params = new HttpParams({
  //     fromObject: {
  //       email: loginModel.email,  
  //       password:loginModel.password      
  //     }
  //   });
  //   return this.httpClient.get<SingleResponseModel<UserDetailsDto>>(environment.apiUrl+"users/getuserdetailsifregistrationorloginsuccess",{params: params})
  // }
