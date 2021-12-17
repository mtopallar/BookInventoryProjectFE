import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public getScreenWidth: any;
  //public getScreenHeight: any;
  public classDiv1: string;
  public classDiv2: string;
  public loggedIn:boolean = false
 
  constructor(private authService:AuthService){}
  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    //this.getScreenHeight = window.innerHeight;
    this.onWindowResize(); 
  
  }

  classSetter() {
    if (this.getScreenWidth < 1500) {
      this.classDiv1 = 'col-3';
      this.classDiv2 = 'col-9';
    } else {
      this.classDiv1 = 'col-2';
      this.classDiv2 = 'col-10';
    }
  }

  @HostListener('window:resize', ['$event'])  
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    //this.getScreenHeight = window.innerHeight;
    this.classSetter();
  }

 
}
