import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //this method runs right before the request is sent, hence 'intercept' title
      //You can modify the request but you must create a new object and send that one
      const modifiedRequest = req.clone({
         headers: req.headers.append('Auth', 'xyz')
      });
      return next.handle(modifiedRequest);
   }
}