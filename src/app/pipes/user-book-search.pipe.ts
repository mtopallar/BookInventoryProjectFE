import { Pipe, PipeTransform } from '@angular/core';
import { UserBookDto } from '../models/userBookDto';

@Pipe({
  name: 'userBookSearch',
})
export class UserBookSearchPipe implements PipeTransform {
  transform(
    value: UserBookDto[],
    bookNameForSearch?: string,
    isbnTextForSearch?: string,
    readedData?: boolean,
    unReadedData?: boolean,
    hasNote?: boolean,
    hasNoNote?: boolean,
    nativeForSearch?: boolean,
    notNativeForSearch?: boolean,
    publisherNameForSearch?: string,
    authorFullNameForSearch?: string,
    genreNameForSearch?: string
  ): UserBookDto[] {
    
    if (bookNameForSearch) {
      return value.filter(
        (u) =>
          u.name
            .toLocaleLowerCase()
            .indexOf(bookNameForSearch.toLocaleLowerCase()) !== -1
      );
    } else if (isbnTextForSearch) {
      return value.filter((u) => u.isbn.indexOf(isbnTextForSearch) !== -1);
    } else if (readedData) {
      return value.filter((u) => u.readStatue === true);
    } else if (unReadedData) {
      return value.filter((u) => u.readStatue === false);
    } else if (hasNote) {
      return value.filter((u) => u.noteDetail !== null);
    } else if (hasNoNote) {
      return value.filter((u) => u.noteDetail === null);
    } else if (nativeForSearch) {
      return value.filter((u) => u.native === true);
    } else if (notNativeForSearch) {
      return value.filter((u) => u.native === false);
    } else if (
      publisherNameForSearch &&
      publisherNameForSearch !== 'Seçiniz...'
    ) {
      return value.filter(
        (b) =>
          b.publisherName
            .toLocaleLowerCase()
            .indexOf(publisherNameForSearch.toLocaleLowerCase()) !== -1
      );
    } else if (
      authorFullNameForSearch &&
      authorFullNameForSearch !== 'Seçiniz...'
    ) {
      return value.filter(
        (b) =>
          b.authorFullName
            .toLocaleLowerCase()
            .indexOf(authorFullNameForSearch.toLocaleLowerCase()) !== -1
      );
    } else if (genreNameForSearch && genreNameForSearch !== 'Seçiniz...') {
      return value.filter(
        (b) =>
          b.genreName
            .toLocaleLowerCase()
            .indexOf(genreNameForSearch.toLocaleLowerCase()) !== -1
      );
    } else {
      return value;
    }
  }
}