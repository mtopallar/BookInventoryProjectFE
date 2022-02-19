import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetailsDto } from '../models/userDetailsDto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userDetails:BehaviorSubject<UserDetailsDto> = new BehaviorSubject<UserDetailsDto>(null)

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getUserDetails(loginModel:LoginModel)
  :Observable<SingleResponseModel<UserDetailsDto>>{
    const params = new HttpParams({
      fromObject: {
        email: loginModel.email,  
        password:loginModel.password      
      }
    });
    return this.httpClient.get<SingleResponseModel<UserDetailsDto>>(environment.apiUrl+"users/getuserdetailsifregistrationorloginsuccess",{params: params})
  }

  getUserDetailsIfLoginOrRegisterationSuccessfull(loginModel:LoginModel){    
    let result:boolean = false;
    this.authService.isUserLoggedIn.subscribe(response=>{
      result = response;      
    })
    if (result) {
      this.getUserDetails(loginModel).subscribe(response=>{
        this.userDetails.next(response.data)
        localStorage.setItem('authenticatedUser', JSON.stringify(response.data)) 
    })
    }else{
      this.userDetails.next(null)
      localStorage.removeItem("authenticatedUser")
    }    
  }
}
