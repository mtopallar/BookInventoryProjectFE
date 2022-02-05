import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../models/genre';

@Pipe({
  name: 'genreSearch'
})
export class GenreSearchPipe implements PipeTransform {

  transform(value: Genre[], searchText?:string): Genre[] {
    if (searchText) {
      return value.filter(a=>a.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !==-1)
    }
    return value;
  }

}
