import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  
  //loginForm:FormGroup;
  public year:number = new Date().getFullYear()
  public createdYear: number = 2021
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    //this.createLoginForm()   
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [Validators.required, Validators.email],
      password: ["",Validators.required]
    })
  }
  
  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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
