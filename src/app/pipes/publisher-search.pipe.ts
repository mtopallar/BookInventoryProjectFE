import { Pipe, PipeTransform } from '@angular/core';
import { Publisher } from '../models/publisher';

@Pipe({
  name: 'publisherSearch'
})
export class PublisherSearchPipe implements PipeTransform {

  transform(value: Publisher[], searchText?:string): Publisher[] {
    if (searchText) {
      return value.filter(a=>a.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !==-1)
    }
    return value;
  }
  
}
