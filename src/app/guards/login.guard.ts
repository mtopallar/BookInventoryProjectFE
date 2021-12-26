import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService:AuthService, private toastrService:ToastrService, private router:Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //if diyerek login kontrolü yaptım ama role göre kontrol de yapabilirim. Bunun için önce rollerin backend den buraya getirilmesi ve rollerin gezilmesi gerekir. Tabi birden fazla guard eklenebilir ya da metod ona göre düzenlenmeli.
      this.authService.isAuthenticatedFlag()     
      if (this.authService.isUserLoggedIn.getValue()) {
        return true
      }else{
        this.router.navigate(["/login"])
        this.toastrService.info("Sisteme giriş yapmalısınız.")        
        return false
      }
      
  }
  
}

// if (this.authService.getTokenOnly() !== null) {
//   return true
// }else{
//     this.router.navigate(["/login"])
//     this.toastrService.info("Sisteme giriş yapmalısınız.")
//     return false;
// }   

