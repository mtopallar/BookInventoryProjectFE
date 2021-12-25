import { AbstractControl, ValidationErrors } from '@angular/forms';
export class WhiteSpacesValidator{
  static whiteSpaces(control:AbstractControl):ValidationErrors | null{
    if ((control.value as string).indexOf(' ') >= 0) {
      return{whiteSpaces:true}
    }
    return null
  }
}