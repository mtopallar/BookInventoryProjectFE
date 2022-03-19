import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  classLibrary: string = 'nav-link active';
  classUserLibrary: string = 'nav-link';
  classDropdown: string = 'nav-link dropdown-toggle';

  public userName:string = "";

  constructor(private authService: AuthService, private router: Router, private userService:UserService) {}

  ngOnInit(): void {
    this.activeClassChanger()
    this.getUserName()
  }

  getUserName(){
    if (this.userService.authenticatedUserDetails.getValue()!=null) {
      this.userName = this.userService.authenticatedUserDetails.getValue().userFullName
    } 
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.authService.isAuthenticatedFlag();
    this.userService.authenticatedUserDetails.next(null)
    this.router.navigate(['/login']);
  }
  activeClassChanger() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/library') {
          this.activeClassResetter()
          this.classLibrary = 'nav-link active';          
        } else if (event.url == '/userlibrary') {
          this.activeClassResetter()
          this.classUserLibrary = 'nav-link active';          
        } else {
          this.activeClassResetter()
          this.classDropdown = 'nav-link dropdown-toggle active';
        }
      }
    });
  }

  activeClassResetter(){
    this.classLibrary = 'nav-link';
    this.classUserLibrary = 'nav-link';
    this.classDropdown = 'nav-link dropdown-toggle';
  }
}
