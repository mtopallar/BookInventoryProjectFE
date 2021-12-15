import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from './../models/genre';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Genre[], searchText:string): Genre[] {
    searchText = searchText?searchText.toLocaleLowerCase():null
    return searchText?value.filter((g:Genre)=>g.name.toLocaleLowerCase().indexOf(searchText)!==-1) : value;
  }

}
