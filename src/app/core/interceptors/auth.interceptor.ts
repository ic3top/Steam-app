import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    const jwtToken = localStorage.getItem('jwt_token');

    if (jwtToken) {
      const cloned = req.clone({
        setHeaders: { Authorization: 'Bearer ' + jwtToken },
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
