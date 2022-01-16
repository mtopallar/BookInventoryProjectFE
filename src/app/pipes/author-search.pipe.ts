import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';

@Pipe({
  name: 'authorSearch'
})
export class AuthorSearchPipe implements PipeTransform {

  transform(value: Author[], searchText?:string, yerliData?:boolean, yabanciData?:boolean): Author[] {
    
    if (searchText) {
      return value.filter(a=>(a.firstName+" "+a.lastName).toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase())!==-1)
    }
    else if (yerliData) {
      return value.filter(a=>a.native == true)
    }
    else if (yabanciData) {
      return value.filter(a=>a.native == false)
    }
    else{
      return value;      
    }
    
  }

}
