import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
      ) {}
    
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        const token = localStorage.getItem('auth_token');
    
        let request = req;
    
        if (token) {
          request = req.clone({
            setHeaders: {
              authorization: `Bearer ${ token }`
            }
          });
        }
    
        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
    
            if (err.status === 401) {
              this.router.navigateByUrl('/');
            }
    
            return throwError( err );
    
          })
        );
      }
    
}