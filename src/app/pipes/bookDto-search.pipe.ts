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
    else if (name) {
      return value.filter(b=>b.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase())!==-1)
    }
    else if (publisherName && publisherName !== "Seçiniz...") {
      return value.filter(b=>b.publisherName.toLocaleLowerCase().indexOf(publisherName.toLocaleLowerCase())!==-1)
    }
    else if (authorFullName && authorFullName !== "Seçiniz...") {
      return value.filter(b=>b.authorFullName.toLocaleLowerCase().indexOf(authorFullName.toLocaleLowerCase())!==-1)
    }
    else if (genreName && genreName !== "Seçiniz...") {
      return value.filter(b=>b.genreName.toLocaleLowerCase().indexOf(genreName.toLocaleLowerCase())!==-1)
    }
    else if (native) {
      console.log(native +"metoddan geldi")
      return value.filter(b=>b.native==true)
    }
    else if (notNative) {
      return value.filter(b=>b.native==false)
    }
    else {
      return value
    } 
  }

}
