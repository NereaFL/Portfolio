import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpDebugInterceptor: HttpInterceptorFn = (req, next) => {
  // Descomenta si quieres ver todas las requests:
  // console.log('[HTTP →]', req.method, req.url);
  return next(req).pipe(
    tap(() => {}),
    catchError((err: HttpErrorResponse) => {
      console.error('[HTTP ERROR]', err.status, req.method, req.url, err.message, err.error);
      return throwError(() => err);
    })
  );
};
