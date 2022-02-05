import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Genre } from '../models/genre';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/baseResponseModel';


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Genre>>{
    return this.httpClient.get<ListResponseModel<Genre>>(environment.apiUrl+"genres/getall");
  }

  add(genre:Genre):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"genres/add",genre)
  }

  update(genre:Genre):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"genres/update",genre)
  }

  delete(genre:Genre):Observable<BaseResponseModel>{
    return this.httpClient.post<BaseResponseModel>(environment.apiUrl+"genres/delete",genre)
  }
}
