import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private userService:UserService) {}
  // TODO Sistem tamamlanınca burada authenticated mı kontrolü yapmayan sadece token ı alıp metodlara ileten bir metod yaz ve onu dene. Behaviour subscribe anlık tepki veriyorsa Guard da kontrol edildiği için zaten navigate edilecektir. Sadece denemek için. Yoksa bu da çalışır.
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url === environment.apiUrl+'auth/login' ||
      request.url === environment.apiUrl+'auth/register'
    ) {
      return next.handle(request);
    }
    let token = this.authService.getTokenOnly();
    if (token != null) {
      let newRequest: HttpRequest<any>;
      newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(newRequest);
    } else {
      this.router.navigate(['/login']);
      this.userService.userDetails.next(null)
      return EMPTY;
    }
  }
}
//Subscribe lı metod
// this.authService.isAuthenticatedFlag();
//     this.authService.isUserLoggedIn.subscribe((response) => {
//       if (response) {
//         let token = this.authService.getTokenOnly();
//         if (token != null) {
//           let newRequest: HttpRequest<any>;
//           newRequest = request.clone({
//             headers: request.headers.set('Authorization', 'Bearer ' + token),
//           });
//           return next.handle(newRequest);
//         }
//       }
//       this.router.navigate(['/login']);
//       return EMPTY;
//     });
//     this.router.navigate(['/login']);
//     return EMPTY;