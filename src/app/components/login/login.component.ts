import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { WhiteSpacesValidator } from 'src/app/projectValidationTools/customValidators/whiteSpacesValidator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup
  public year:number = new Date().getFullYear()
  public createdYear: number = 2021
  public loginError:boolean = false;
  public buttonClass:string = "w-100 btn btn-lg btn-primary"
  public loginErrorMessages:string[] = []
  
  

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router, private toastrService:ToastrService) {} 
  
  ngOnInit(): void {
    this.createLoginForm()
    this.loginErrorCleaner()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required, Validators.pattern(ProjectRegexes.email)]],
      password: ["",[Validators.required, WhiteSpacesValidator.noAnyWhiteSpaces]]
    })
  }
    
  login(){
    this.loginErrorMessages= []
    if(this.loginForm.valid){   
      let loginModel = Object.assign({},this.loginForm.value)        
      this.authService.login(loginModel).subscribe(response=>{
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("expiration", response.data.expiration.toString())
        this.authService.isAuthenticatedFlag()
        this.router.navigate(["/library"])
      },errorResponse=>{
        this.loginError = true;        
        this.buttonClass = "w-100 btn btn-lg btn-danger"  
        if (errorResponse.error.ValidationErrors) {          
          for (let index = 0; index < errorResponse.error.ValidationErrors.length; index++) {
            this.loginErrorMessages.push(errorResponse.error.ValidationErrors[index].ErrorMessage)
          }
        }else{          
          this.loginErrorMessages.push("Hatalı giriş. Lütfen bilgilerinizi kontrol ediniz.")
        }        
      })
    }
  }

  loginErrorCleaner(){
      this.loginForm.valueChanges.subscribe(response=>{     
      if (this.loginForm.valid) {    
          this.loginError = false
          this.buttonClass = "w-100 btn btn-lg btn-primary"
      } 
    })
  }

  get email(){
    return this.loginForm.get("email")
  }

  get password(){
    return this.loginForm.get("password")
  }

}
//this.authService.isUserLoggedIn.next(true)
//window.location.assign("/library")
//this.router.navigateByUrl("/library")
//----------------------------------------------------
// loginForm = new FormGroup({    
  //   email : new FormControl("",[Validators.required, Validators.pattern(ProjectRegexes.email)]),
  //   password : new FormControl("",[Validators.required, WhiteSpacesValidator.noAnyWhiteSpaces])
  // });
//---------------------------------------------------------------------

// Alternatif kullanım
 // loginForm:FormGroup = this.formBuilder.group({
  //   email: ["",[Validators.required, Validators.pattern(ProjectRegexes.email)]],
  //   password: ["",[Validators.required, WhiteSpacesValidator.noAnyWhiteSpaces]]
  // })

//------------------------------------------------------------------
 // write(){
  //   console.log(this.loginForm.value)
  // }

