import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private route: ActivatedRoute) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          if(error.status == 401){
            localStorage.clear();
            this.router.navigateByUrl('');
          }
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
