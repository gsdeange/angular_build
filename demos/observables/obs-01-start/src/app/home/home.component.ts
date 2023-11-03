import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    // const customInterval = Observable.create(observer => {
    //   let count = 0;
    //   setInterval( () => {
    //     observer.next(count);
    //     if (count === 5) {
    //       //this stops the observable from throwing an error. You do not need to unsubscribe.
    //       observer.complete();
    //     }
    //     if (count > 3) {
    //       //when it cancels due to an error, you will never complete the observable.
    //       observer.error(new Error("count is greater than 3"));
    //     }
    //     count++;
    //   }, 1000);
    // });

    //observable subscription takes up to 3 arguments:
      //1. the function to do anything
      //2. the function to handle errors
      //3. the function upon success, like cleanup
  //   this.firstObsSubscription = customInterval.subscribe(data => {
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //     alert(error);
  //   }, () => {
  //     console.log("completed!");
  //   });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
