import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    //this.firstObservableSubscription = interval(1000).subscribe((count) => {
    //  console.log(count);
    //});
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error('Count is greater than 3!');
        }
        count++;
      }, 1000);
    });

    customIntervalObservable.pipe(map((data: number) => {
      return 'Round ' + (data + 1);
    }));

    this.firstObservableSubscription = customIntervalObservable
      .pipe(filter(data => {
        return data > 0;
      }), map((data: number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
        console.log(error);
    }, () => {
        console.log('completed');
    });
  }

  ngOnDestroy(): void {
    this.firstObservableSubscription.unsubscribe();
  }
}
