import { Pipe, PipeTransform } from '@angular/core';
import { UserWithDetailsAndRolesDto } from '../models/userWithDetailsAndRolesDto';

@Pipe({
  name: 'userSearchForAdmin'
})
export class UserSearchForAdminPipe implements PipeTransform {

  transform(value: UserWithDetailsAndRolesDto[], userMailForSearch ?:string, userNameLastNameForSearch ?:string): UserWithDetailsAndRolesDto[] {
    if (userMailForSearch) {
      return value.filter(u=>u.email.toLocaleLowerCase().indexOf(userMailForSearch.toLocaleLowerCase()) !== -1)
    }
    else if (userNameLastNameForSearch) {
      return value.filter(u=>(u.firstName.toLocaleLowerCase() + " " + u.lastName.toLocaleLowerCase()).indexOf(userNameLastNameForSearch.toLocaleLowerCase()) !== -1)
    }    
    return value;    
  }

}
