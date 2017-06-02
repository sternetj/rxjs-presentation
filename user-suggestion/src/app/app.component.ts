import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Http } from '@angular/http';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { UserInfo } from 'app/models/UserInfo';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(UserWidgetComponent) private widgets: QueryList<UserWidgetComponent>;

  public userStreams = [];

  private responseStream: Observable<UserInfo[]>;
  private userIndex = -29;

  constructor(public http: Http) { }

  ngAfterViewInit(): void {
    const refreshButton = document.querySelector('.refresh');
    const refreshClickStream = Observable.fromEvent(refreshButton, 'click');

    const requestStream = refreshClickStream// .startWith('startup click')
      .map(() => {
        this.userIndex += 30;
        return 'https://api.github.com/users?since=' + this.userIndex;
      });

    this.responseStream = requestStream
      .mergeMap((requestUrl) => {
        return this.http.get(requestUrl).map((d) => d.json() as UserInfo[]);
      });


    this.widgets.toArray().forEach((widget, i) => {
      this.userStreams[i] = this.responseStream.map((users) => this.getUser(users));
      // this.userStreams[i] = this.createSuggestionStream(widget.closeClickedObservable);
    });
  }

  private createSuggestionStream(closeClickStream) {
    return closeClickStream// .startWith('startup click')
      .combineLatest(this.responseStream, (click, listUsers) => this.getUser(listUsers));
  }

  private getUser(users: UserInfo[]) {
    return users[Math.floor(Math.random() * users.length)];
  }
}
