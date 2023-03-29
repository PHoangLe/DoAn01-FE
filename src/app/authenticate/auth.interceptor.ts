import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
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
      // catchError(
      //   (err: HttpErrorResponse) => {
      //     console.log(err.status);
      //   }
      // )
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
