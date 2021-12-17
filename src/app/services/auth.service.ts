import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AccessTokenModel } from '../models/accessTokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //userAuthenticated = new Subject<Boolean>();
  constructor(private httpClient:HttpClient) { }

  apiUrl = "https://localhost:44325/api/auth/";

  login(loginModel:LoginModel):Observable<SingleResponseModel<AccessTokenModel>>{
    return this.httpClient.post<SingleResponseModel<AccessTokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    let expiration:Date = new Date(localStorage.getItem("expiration")) 
    let token:string = localStorage.getItem("token")
    
    if (token && new Date < expiration) {      
      return true;
    }else{      
      localStorage.removeItem("token")
      localStorage.removeItem("expiration")
      return false;
    }
  }


}




//  isAuthenticated(){
//     let tokenExpirationFromLs:Date = new Date(localStorage.getItem("expiration")) 
//     let tokenFromLs:string = localStorage.getItem("token")   
     
//     if (tokenFromLs && new Date < tokenExpirationFromLs) {
      
//       return this.userAuthenticated.next(true)
//       //return true;
//     }else{
//       //return false;
//       localStorage.removeItem("token")
//       localStorage.removeItem("expiration")
//       return this.userAuthenticated.next(false)
//     }
//   }


 // isAuthenticated(){
  //   if (localStorage.getItem("token")) {
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

 
