import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    //this.createLoginForm()   
  }
  
  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required])
  });
  

  login(){
    if(this.loginForm.valid){
      // console.log(this.loginForm.value)
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

  

}
//this.authService.isUserLoggedIn.next(true)
//window.location.assign("/library")
//this.router.navigateByUrl("/library")
//----------------------------------------------------
// createLoginForm(){
//   this.loginForm = this.formBuilder.group({
//     email: [Validators.required],
//     password: ["",Validators.required]
//   })
// }