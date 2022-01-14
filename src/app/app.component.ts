import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public loggedIn:boolean;
  public isItLogIn:boolean
  public isItRegister:boolean
  public navigationEnd:string
 
  constructor(private authService:AuthService, private router:Router){
    this.authService.isAuthenticatedFlag();
    this.authService.isUserLoggedIn.subscribe(value=>{
      this.loggedIn = value;
    })
    
  }
  ngOnInit() {    
    this.navigationEndSelector()    
  }

  navigationEndSelector(){
    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){  
        this.navigationEnd = event.url        
        if (this.loggedIn && this.navigationEnd == "/") {  
          this.router.navigate(["/library"])
        }       
        else if (!this.loggedIn && this.navigationEnd == "/login" || this.navigationEnd=="/") {          
          this.isItLogIn = true
          this.isItRegister = false
        }
        else if (!this.loggedIn && this.navigationEnd == "/register") {
          this.isItRegister = true
          this.isItLogIn = false
        }
      }
    });
  }
   
}
