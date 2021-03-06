import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

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
  public imageWidth:string;
  public imageHeight:string
  public imageSrc:string
 
  constructor(private authService:AuthService, private router:Router, private userService:UserService){
    this.authService.isAuthenticatedFlag();
    this.authService.isUserLoggedIn.subscribe(value=>{
      this.loggedIn = value;      
    })
  }
  ngOnInit() {    
    this.navigationEndSelector() 
    this.divColSetter()  
    this.getAuthenticatedUser()  
  }

  getAuthenticatedUser(){
    if (this.loggedIn) {
      this.userService.getAuthenticatedUserFromToken()
    }
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
    this.imageWidth=(window.innerWidth-20).toString()
    if (window.innerWidth<1500) {
      this.divCol = "mx-5 my-3"
      this.imageSrc="assets/images/banner.png"
      this.imageHeight="210"
    }else{
      this.divCol = "col-12 px-4"
      this.imageSrc="assets/images/banner-long.png"
      this.imageHeight="190"
    }    
  }
}
