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
import { DeleteForUserDto } from '../models/deleteFourUserDto';

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

  deleteForAdmin(userId:number):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"users/deleteforadmin",userId)
  }

  //kullanıcının kendini silmesi için gerekecek.
  deleteForUser(deleteForUserDto:DeleteForUserDto):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"users/deleteforuser",deleteForUserDto)
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
