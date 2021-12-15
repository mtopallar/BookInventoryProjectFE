import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Genre } from '../models/genre';


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiUrl:string = "https://localhost:44325/api/genres/getall"

  constructor(private httpClient:HttpClient) { }

  getGenres():Observable<ListResponseModel<Genre>>{
    return this.httpClient.get<ListResponseModel<Genre>>(this.apiUrl);
  }
}
