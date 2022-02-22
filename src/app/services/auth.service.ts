import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AccessTokenModel } from '../models/accessTokenModel';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageHelperService } from './local-storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private httpClient:HttpClient, private localStorageHelperService:LocalStorageHelperService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<AccessTokenModel>>{
    return this.httpClient.post<SingleResponseModel<AccessTokenModel>>(environment.apiUrl+"auth/login",loginModel)
  }  

  register(registerModel:RegisterModel):Observable<SingleResponseModel<AccessTokenModel>>{
    return this.httpClient.post<SingleResponseModel<AccessTokenModel>>(environment.apiUrl+"auth/register",registerModel)
  }

  isAuthenticatedFlag(){    
    let expiration:Date = new Date(this.localStorageHelperService.getFromLocalStorageWithDecryption("expiration"))   
    let token:string = this.localStorageHelperService.getFromLocalStorageWithDecryption("token")
    
    if (token && expiration && expiration > new Date()) { 
      this.isUserLoggedIn.next(true)
    }else{      
      localStorage.removeItem("token")
      localStorage.removeItem("expiration")
      this.isUserLoggedIn.next(false)
    }
  }

  getTokenOnly(){
    this.isAuthenticatedFlag()
    if (this.isUserLoggedIn.getValue()) {      
      return this.localStorageHelperService.getFromLocalStorageWithDecryption("token")
    }else{
      return null
    }   
    
  }
}


 // isAuthenticated(){
  //   if (localStorage.getItem("token")) {
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }