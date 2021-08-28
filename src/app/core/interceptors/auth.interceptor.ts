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

    const JWT_TOKEN = localStorage.getItem('jwt_token');

    if (JWT_TOKEN) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + JWT_TOKEN),
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
