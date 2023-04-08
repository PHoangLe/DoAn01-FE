import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(req.headers.get('No-Auth') === 'True'){
      return next.handle(req.clone())
    }
      const token = this.authService.getToken()
      req = this.addToken(req, token)
    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          if(err.status === 401){
            console.log("")
          }
          else if(err.status === 403){
            console.log("page forbidden")
          }
          return throwError("Some thing went wrong")
        }
      )
    )
}

  addToken(req: HttpRequest<any>, token: string | null) {
    return req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
