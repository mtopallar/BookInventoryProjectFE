import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AccessTokenModel } from '../models/accessTokenModel';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<AccessTokenModel>>{
    return this.httpClient.post<SingleResponseModel<AccessTokenModel>>(environment.apiUrl+"auth/login",loginModel)
  }  

  register(registerModel:RegisterModel):Observable<SingleResponseModel<AccessTokenModel>>{
    return this.httpClient.post<SingleResponseModel<AccessTokenModel>>(environment.apiUrl+"auth/register",registerModel)
  }

  isAuthenticatedFlag(){
    let expiration:Date = new Date(localStorage.getItem("expiration")) 
    let token:string = localStorage.getItem("token")
    
    if (token && new Date() < expiration) {   
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
      return localStorage.getItem("token")
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