import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { UserBook } from '../models/userBook';

@Injectable({
  providedIn: 'root'
})
export class UserBookService {

  constructor(private httpClient:HttpClient) { }

  addToUserLibrary(userBook:UserBook):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"userbooks/add", userBook)
  }

  getActivatedUsersAllBooks(userId:number):Observable<ListResponseModel<UserBook>>{
    return this.httpClient.get<ListResponseModel<UserBook>>(environment.apiUrl+"userbooks/getall",{params: new HttpParams().set("userId",userId)})
  }

  updateUserBook(userBook:UserBook):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"userbooks/update",userBook)
  }

  deleteUserBook(userBook:UserBook):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"userbooks/delete",userBook)
  }
}
