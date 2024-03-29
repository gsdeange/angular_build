import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

   error = new Subject<string>();

   constructor(private http: HttpClient) {}

   createAndStorePost(title: string, content: string) {
      const postData: Post = {title: title, content: content};
      //send http request
      // Send Http request
      this.http
      .post<{ name: string }>(
         'https://ng-complete-guide-66848-default-rtdb.firebaseio.com/posts.json',
         postData,
         {
            observe: 'response'
         }
      )
      .subscribe(responseData => {
         console.log(responseData.body);
      }, error => {
         this.error.next(error.message);
      });
   }
 
   fetchPosts() {
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
      return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-66848-default-rtdb.firebaseio.com/posts.json',
        {
         headers: new HttpHeaders({
            'Custom-Header' : 'Hello'
         }),
         params: searchParams,
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
            //send to analytics server or error handling tasks. Must return observable\
            return throwError(errorRes);
        })
      );
   }

   deletePosts() {
      return this.http
         .delete('https://ng-complete-guide-66848-default-rtdb.firebaseio.com/posts.json', 
         {
            observe: 'events',
            responseType: 'text'
         }).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Sent){
               //we know that the action was sent, wait for response here
            }
            if (event.type === HttpEventType.Response){
               console.log(event.body);
            } 
         })
      );
   }

}