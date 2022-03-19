import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimsService {

  constructor(private httpClient:HttpClient) { }

  getPredefinedRoles():Observable<ListResponseModel<OperationClaim>>{
    return this.httpClient.get<ListResponseModel<OperationClaim>>(environment.apiUrl+"operationclaims/getpredefinedclaims")
  }
  
  getRolesInSystem():Observable<ListResponseModel<OperationClaim>>{
    return this.httpClient.get<ListResponseModel<OperationClaim>>(environment.apiUrl+"operationclaims/getall")
  }

  addRole(operationClaim:OperationClaim):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"operationclaims/add",operationClaim)
  }

  deleteRole(operationClaim:OperationClaim):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"operationclaims/delete", operationClaim)
  }

}

