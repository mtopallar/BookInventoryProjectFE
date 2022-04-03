import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageHelperService } from 'src/app/services/local-storage-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public year:number = new Date().getFullYear()
  public createdYear: number = 2021
  public registerForm:FormGroup
  public registerError:boolean = false;
  public buttonClass:string = "w-100 btn btn-lg btn-primary"
  public registerErrorMessages:string[] = []

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router, private localStorageHelperService:LocalStorageHelperService, private userService:UserService) { }

  ngOnInit(): void {
    this.createRegisterForm()
    this.registerErrorCleaner()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ["",[Validators.required, Validators.pattern(ProjectRegexes.email)]],
      password: ["",[Validators.required, Validators.pattern(ProjectRegexes.patternForPassword)]],
      firstName: ["",[Validators.required,Validators.minLength(3),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]],
      lastName: ["",[Validators.required,Validators.minLength(2),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]],
    })
  }
  register(){
    this.registerErrorMessages=[]
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.localStorageHelperService.setToLocalStorageWithEncryption("token", response.data.token)    
        this.localStorageHelperService.setToLocalStorageWithEncryption("expiration", new Date(response.data.expiration).toString())
        this.authService.isAuthenticatedFlag()
        this.userService.getAuthenticatedUserFromToken()
        this.router.navigate(["/library"])
      },errorResponse=>{
        this.registerError = true
        this.buttonClass = "w-100 btn btn-lg btn-danger"                
        if (errorResponse.error.ValidationErrors) {          
          for (let index = 0; index < errorResponse.error.ValidationErrors.length; index++) {
            this.registerErrorMessages.push(errorResponse.error.ValidationErrors[index].ErrorMessage)
          }
        }else{ 
          this.registerErrorMessages.push(errorResponse.error.message)
        }        
      })
    }
  }

  registerErrorCleaner(){
    this.registerForm.valueChanges.subscribe(response=>{     
    if (this.registerForm.valid) {    
        this.registerError = false
        this.buttonClass = "w-100 btn btn-lg btn-primary"
    } 
  })
}

  get email(){
    return this.registerForm.get("email")
  }
  get password(){
    return this.registerForm.get("password")
  }
  get firstName(){
    return this.registerForm.get("firstName")
  }
  get lastName(){
    return this.registerForm.get("lastName")
  }
}

// switch (errorResponse.error.ValidationErrors[index].PropertyName) {
            //   case "FirstName":
            //     this.registerErrorMessages.push("Ad  hatası: "+errorResponse.error.ValidationErrors[index].ErrorMessage)
            //     break;
            //   case "LastName":
            //     this.registerErrorMessages.push("Soyad hatası: "+errorResponse.error.ValidationErrors[index].ErrorMessage)
            //     break;
            //   default:
            //     break;
            // }
