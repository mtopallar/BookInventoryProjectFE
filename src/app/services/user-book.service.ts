import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author';
import { BaseResponseModel } from '../models/baseResponseModel';
import { Genre } from '../models/genre';
import { ListResponseModel } from '../models/listResponseModel';
import { Publisher } from '../models/publisher';
import { UserBook } from '../models/userBook';
import { UserBookDto } from '../models/userBookDto';

@Injectable({
  providedIn: 'root'
})
export class UserBookService {

  constructor(private httpClient:HttpClient) { } 

  getActivatedUsersAllBooks(userId:number):Observable<ListResponseModel<UserBookDto>>{
    return this.httpClient.get<ListResponseModel<UserBookDto>>(environment.apiUrl+"userbooks/getall",{params: new HttpParams().set("userId",userId)})
  }

  getAllAuthorsInUsersLibrary(userId:number):Observable<ListResponseModel<Author>>{
    return this.httpClient.get<ListResponseModel<Author>>(environment.apiUrl+"userbooks/getauthorsinuserlibrary", {params: new HttpParams().set("userId",userId)})
  }

  getAllGenresInUserLibrary(userId:number):Observable<ListResponseModel<Genre>> {
    return this.httpClient.get<ListResponseModel<Genre>>(environment.apiUrl+"userbooks/getgenresinuserlibrary", {params: new HttpParams().set("userId",userId)})
  }

  getAllPublishersInUserLibrary(userId:number):Observable<ListResponseModel<Publisher>> {
    return this.httpClient.get<ListResponseModel<Publisher>>(environment.apiUrl+"userbooks/getpublishersinuserlibrary", {params: new HttpParams().set("userId",userId)})
  }

  addToUserLibrary(userBook:UserBook):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"userbooks/add", userBook)
  }

  updateUserBook(userBook:UserBook):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"userbooks/update",userBook)
  }

  deleteUserBook(userBook:UserBook):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"userbooks/delete",userBook)
  }
}
