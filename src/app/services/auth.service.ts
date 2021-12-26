import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AccessTokenModel } from '../models/accessTokenModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private httpClient:HttpClient, private router:Router) { }

  apiUrl = "https://localhost:44325/api/auth/";

  login(loginModel:LoginModel):Observable<SingleResponseModel<AccessTokenModel>>{
    return this.httpClient.post<SingleResponseModel<AccessTokenModel>>(this.apiUrl+"login",loginModel)
  }  

  isAuthenticatedFlag(){
    let expiration:Date = new Date(localStorage.getItem("expiration")) 
    let token:string = localStorage.getItem("token")
    
    if (token && new Date < expiration) {   
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

  // getTokenWithLoginControl(){
  //   this.isAuthenticatedFlag()
  //   this.isUserLoggedIn.subscribe(result =>{
  //     if (result) {
  //       let token:string = localStorage.getItem("token")
  //       return token
  //     }
  //     else{
  //       return null
  //     }
  //   })
  // }

}


 // isAuthenticated(){
  //   if (localStorage.getItem("token")) {
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }


   // getTokenOnly(){
      // let token:string = localStorage.getItem("token")
      // let expiration:Date = new Date(localStorage.getItem("expiration"))
      // if (token && new Date < expiration) {
      //   return token
      // }else{
      //   return null
    // }

 
