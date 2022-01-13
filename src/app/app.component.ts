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
  public navigationEnd:string = ""
 
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
          //console.log("if"+this.navigationEnd)
        }
        // else{
        //  console.log("else"+this.navigationEnd)
        // }
      }
    });
  }
   
}

//public getScreenWidth: any;
//public getScreenHeight: any;

// classSetter() {
  //   if (this.getScreenWidth < 1500) {
  //     this.classDiv1 = 'col-3';
  //     this.classDiv2 = 'col-9';
  //   } else {
  //     this.classDiv1 = 'col-2';
  //     this.classDiv2 = 'col-10';
  //   }
  // }

  // @HostListener('window:resize', ['$event'])  
  // onWindowResize() {
  //   this.getScreenWidth = window.innerWidth;
  //   //this.getScreenHeight = window.innerHeight;
  //   this.classSetter();
  // }
