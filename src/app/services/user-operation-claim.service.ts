import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { UserOperationClaimWithAttemptingUserIdDto } from '../models/userOperationClaimWithAttemptingUserIdDto';
import { UserOperationClaimDto } from '../models/userOperationClaimDto';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(private httClient:HttpClient) { }

  getAuthenticatedUserRolesDto(userId:number):Observable<ListResponseModel<UserOperationClaimDto>>{
    return this.httClient.get<ListResponseModel<UserOperationClaimDto>>(environment.apiUrl+"useroperationclaims/getauthenticateduserclaims", {params: new HttpParams().set("userId",userId)})
  }

  add(userOperationClaimWithAttemptingUserIdDto:UserOperationClaimWithAttemptingUserIdDto):Observable<BaseResponseModel>{
    return this.httClient.post<BaseResponseModel>(environment.apiUrl+"useroperationclaims/add",userOperationClaimWithAttemptingUserIdDto)
  }

  delete(userOperationClaimWithAttemptingUserIdDto:UserOperationClaimWithAttemptingUserIdDto):Observable<BaseResponseModel>{
    return this.httClient.post<BaseResponseModel>(environment.apiUrl+"useroperationclaims/delete",userOperationClaimWithAttemptingUserIdDto)
  }
  
}
