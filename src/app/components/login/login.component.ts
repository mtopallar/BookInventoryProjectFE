import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { WhiteSpacesValidator } from 'src/app/projectValidationTools/customValidators/whiteSpacesValidator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  public year:number = new Date().getFullYear()
  public createdYear: number = 2021
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {} 
  
  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required, Validators.pattern(ProjectRegexes.email)]],
      password: ["",[Validators.required, WhiteSpacesValidator.noAnyWhiteSpaces]]
    })
  }
  
  write(){
    console.log(this.loginForm.value)
  }
  
    
  login(){
    if(this.loginForm.valid){     
      let loginModel = Object.assign({},this.loginForm.value)        
      this.authService.login(loginModel).subscribe(response=>{
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("expiration", response.data.expiration.toString())
        this.authService.isAuthenticatedFlag()
        this.router.navigate(["/library"])
      })
    }
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

