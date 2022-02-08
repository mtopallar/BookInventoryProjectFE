import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Publisher } from '../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private httpCLient:HttpClient) { }

  getAll():Observable<ListResponseModel<Publisher>>{
    return this.httpCLient.get<ListResponseModel<Publisher>>(environment.apiUrl+"publishers/getall")
  }

  add(publisher:Publisher):Observable<BaseResponseModel>{
    return this.httpCLient.post<BaseResponseModel>(environment.apiUrl+"publishers/add",publisher)
  }

  update(publisher:Publisher):Observable<BaseResponseModel>{
    return this.httpCLient.post<BaseResponseModel>(environment.apiUrl+"publishers/update",publisher)
  }

  delete(publisher:Publisher):Observable<BaseResponseModel>{
    return this.httpCLient.post<BaseResponseModel>(environment.apiUrl+"publishers/delete",publisher)
  }
}
