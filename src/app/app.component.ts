import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public loggedIn:boolean;
  public isItLogIn:boolean = false
  public isItRegister:boolean = false
  public routerOutlet:boolean = false
  public navigationEnd:string
  public divCol:string
 
  constructor(private authService:AuthService, private router:Router){
    this.authService.isAuthenticatedFlag();
    this.authService.isUserLoggedIn.subscribe(value=>{
      this.loggedIn = value;      
    })
  }
  ngOnInit() {    
    this.navigationEndSelector() 
    this.divColSetter()
  }

  navigationEndSelector(){
    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){             
        this.navigationEnd = event.url       
        if (this.loggedIn && this.navigationEnd == "/") {  
          this.router.navigate(["/library"])
        }       
        else if (this.navigationEnd == "/login" || this.navigationEnd == "/") { 
          this.routerResetter()        
          this.isItLogIn = true                            
        }
        else if (this.navigationEnd == "/register") {
          this.routerResetter()
          this.isItRegister = true
        }
        else{
          this.routerResetter()
          this.routerOutlet = true
        }
                       
        //console.log(this.isItRegister +" "+this.isItLogIn+" "+this.routerOutlet)
      }
    });
    
  }
  
  routerResetter(){
    this.isItLogIn = false
    this.isItRegister = false
    this.routerOutlet = false
  }
   
  @HostListener('window:resize', ['$event'])
  divColSetter() {
    if (window.innerWidth<1500) {
      this.divCol = "mx-5 my-3"
    }else{
      this.divCol = "col-10 offset-1"
    }    
  }
}
