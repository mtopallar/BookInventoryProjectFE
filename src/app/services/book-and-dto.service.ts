import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';
import { Book } from '../models/book';
import { BookDto } from '../models/bookDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookAndDtoService {

  constructor(private httpClient:HttpClient) { }

  getallBookDtos():Observable<ListResponseModel<BookDto>>{
    return this.httpClient.get<ListResponseModel<BookDto>>(environment.apiUrl+"books/getallview")
  }

  addBook(book:Book):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"books/add", book)
  }

  updateBook(book:Book):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"books/update", book)
  }
}
