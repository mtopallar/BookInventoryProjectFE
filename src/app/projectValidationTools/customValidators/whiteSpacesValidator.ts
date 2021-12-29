import { AbstractControl, ValidationErrors } from '@angular/forms';
export class WhiteSpacesValidator{
  static noAnyWhiteSpaces(control:AbstractControl):ValidationErrors | null{
    if ((control.value as string).indexOf(' ') >= 0) {
      return{noAnyWhiteSpaces:true}
    }
    return null
  }
}