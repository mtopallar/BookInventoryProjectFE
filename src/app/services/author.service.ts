import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient:HttpClient) { }
  
  getAll():Observable<ListResponseModel<Author>>{
    return this.httpClient.get<ListResponseModel<Author>>(environment.apiUrl+"authors/getall")
  }

  getAllForSearchArea():Observable<ListResponseModel<Author>>{
    return this.httpClient.get<ListResponseModel<Author>>(environment.apiUrl+"authors/getallregardlessofactivestatue")
  }

  //kullanmadım.
  getById(id:number):Observable<SingleResponseModel<Author>>{
    return this.httpClient.get<SingleResponseModel<Author>>(environment.apiUrl+"authors/getbyid",{params: new HttpParams().set("id",id)})
  }
  //not getById metodunu bu şekilde kullanarak id gibi değer tipleri query string olmadan body den göndermek mümkün olabiliyor. new HttpParams().set("id",id) içindeki ilk (tırnak içindeki) yeşil renkli id  backenddeki metoddaki parametre adı ile aynı olmalı.

  // getById(id:number):Observable<SingleResponseModel<Author>>{
  //   return this.httpClient.get<SingleResponseModel<Author>>(environment.apiUrl+"authors/getbyid?id="+id)
  // }

  add(author:Author):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"authors/add",author)
  }

  update(author:Author):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"authors/update",author)
  }

  delete(author:Author):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"authors/delete",author)
  }
}
