import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';
import { Book } from '../models/book';
import { BookDto } from '../models/bookDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookAndDtoService {

  constructor(private httpClient:HttpClient) { }

  getallBookDtos():Observable<ListResponseModel<BookDto>>{
    return this.httpClient.get<ListResponseModel<BookDto>>(environment.apiUrl+"books/getallview")
  }

  getBookById(id:number):Observable<SingleResponseModel<Book>>{
    return this.httpClient.get<SingleResponseModel<Book>>(environment.apiUrl+"books/getbyid",{params: new HttpParams().set("id",id)})
  }

  addBook(book:Book):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"books/add", book)
  }

  updateBook(book:Book):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"books/update", book)
  }
}
