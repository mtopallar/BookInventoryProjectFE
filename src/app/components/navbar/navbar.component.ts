import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  classLibrary: string = 'nav-link';
  classUserLibrary: string = 'nav-link';
  classAuthors: string = 'nav-link';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.activeClassChanger()
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.authService.isAuthenticatedFlag();
    this.router.navigate(['/login']);
  }
  activeClassChanger() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/library') {
          this.classLibrary = 'nav-link active';
          this.classUserLibrary = 'nav-link';
          this.classAuthors = 'nav-link';
        } else if (event.url == '/userlibrary') {
          this.classUserLibrary = 'nav-link active';
          this.classLibrary = 'nav-link';
          this.classAuthors = 'nav-link';
        } else if (event.url == '/authors') {
          this.classAuthors = 'nav-link active';
          this.classLibrary = 'nav-link';
          this.classUserLibrary = 'nav-link';
        }
      }
    });
  }
}
