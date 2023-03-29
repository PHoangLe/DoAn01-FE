import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.getToken() !== null){
       const role = route.data["userRoles"] as Array<string>;

       if(role){        const match = this.authService.roleMatch(role);

        if(match){
          return true;
        }
        else{
          return false;
        }
       }
    }
    this.router.navigate(['/login'])
    return false
  }

}
