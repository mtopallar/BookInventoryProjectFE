import { Pipe, PipeTransform } from '@angular/core';
import { BookDto } from '../models/bookDto';

@Pipe({
  name: 'bookDtoSearch'
})
export class BookDtoSearchPipe implements PipeTransform {

  transform(value: BookDto[], isbnTextForSearch?:string, bookNameForSearch?:string, publisherNameForSearch?:string, authorFullNameForSearch?:string, genreNameForSearch?:string, nativeForSearch?:boolean, notNativeForSearch?:boolean): BookDto[] {
    
    if (isbnTextForSearch) {
      return value.filter(b=>b.isbn.toLocaleLowerCase().indexOf(isbnTextForSearch.toLocaleLowerCase())!==-1)
    }
    else if (bookNameForSearch) {
      return value.filter(b=>b.name.toLocaleLowerCase().indexOf(bookNameForSearch.toLocaleLowerCase())!==-1)
    }
    else if (publisherNameForSearch && publisherNameForSearch !== "Seçiniz...") {
      return value.filter(b=>b.publisherName.toLocaleLowerCase().indexOf(publisherNameForSearch.toLocaleLowerCase())!==-1)
    }
    else if (authorFullNameForSearch && authorFullNameForSearch !== "Seçiniz...") {
      return value.filter(b=>b.authorFullName.toLocaleLowerCase().indexOf(authorFullNameForSearch.toLocaleLowerCase())!==-1)
    }
    else if (genreNameForSearch && genreNameForSearch !== "Seçiniz...") {
      return value.filter(b=>b.genreName.toLocaleLowerCase().indexOf(genreNameForSearch.toLocaleLowerCase())!==-1)
    }
    else if (nativeForSearch) {
      return value.filter(b=>b.native==true)
    }
    else if (notNativeForSearch) {
      return value.filter(b=>b.native==false)
    }
    else {
      return value
    } 
  }

}
