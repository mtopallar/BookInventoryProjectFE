import { Pipe, PipeTransform } from '@angular/core';
import { BookDto } from '../models/bookDto';

@Pipe({
  name: 'bookDtoSearch'
})
export class BookDtoSearchPipe implements PipeTransform {

  transform(value: BookDto[], isbnText?:string, name?:string, publisherName?:string, authorFullName?:string, genreName?:string, native?:boolean, notNative?:boolean): BookDto[] {
    if (isbnText) {
      return value.filter(b=>b.isbn.toLocaleLowerCase().indexOf(isbnText.toLocaleLowerCase())!==-1)
    }
    if (name) {
      return value.filter(b=>b.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase())!==-1)
    }
    if (publisherName) {
      return value.filter(b=>b.publisherName.toLocaleLowerCase().indexOf(publisherName.toLocaleLowerCase())!==-1)
    }
    if (authorFullName) {
      return value.filter(b=>b.authorFullName.toLocaleLowerCase().indexOf(authorFullName.toLocaleLowerCase())!==-1)
    }
    if (genreName) {
      return value.filter(b=>b.genreName.toLocaleLowerCase().indexOf(genreName.toLocaleLowerCase())!==-1)
    }
    if (native) {
      return value.filter(b=>b.native==true)
    }
    if (notNative) {
      return value.filter(b=>b.native==false)
    }
    return value
  }

}
