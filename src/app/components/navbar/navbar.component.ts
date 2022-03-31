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
  public canUserSeeAdminPanel:boolean = false;
  public canUserSeeAuthorPanel:boolean = false;
  public canUserSeeGenrePanel:boolean = false;
  public canUserSeePublisherPanel:boolean = false;
  public canUserSeeBookPanel:boolean = false;
  public canUserSeeRolePanel:boolean = false;
  public canUserSeeUserPanel:boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService:UserService) {}

  ngOnInit(): void {
    this.activeClassChanger()
    this.getUserName()
    this.canUserSee()
  }

  canUserSee(){
    this.canUserSeeAdminPanel = this.userService.hasUserThisRole("admin","publisher.admin","genre.admin","book.admin","author.admin","user.admin")
    this.canUserSeeAuthorPanel = this.userService.hasUserThisRole("admin","author.admin")
    this.canUserSeeGenrePanel = this.userService.hasUserThisRole("admin","genre.admin")
    this.canUserSeePublisherPanel = this.userService.hasUserThisRole("admin","publisher.admin")
    this.canUserSeeBookPanel = this.userService.hasUserThisRole("admin","book.admin")
    this.canUserSeeRolePanel = this.userService.hasUserThisRole("admin")
    this.canUserSeeUserPanel = this.userService.hasUserThisRole("admin","user.admin")        
  }

  getUserName(){
    if (this.userService.authenticatedUserDetails.getValue()!=null) {
      this.userName = this.userService.authenticatedUserDetails.getValue().userFullName
    } 
  }

  logOut() {
    this.authService.logOut()
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
