import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Http } from '@angular/http';
import { UserWidgetComponent } from './user-widget/user-widget.component';

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

  responseStream: Observable<{
    html_url: string;
    login: string;
    avatar_url: string;
  }>;
  suggestion1Stream: Observable<any>;
  private userIndex = -29;
  public userStreams = [];

  constructor(public http: Http) { }

  ngAfterViewInit(): void {
    const refreshButton = document.querySelector('.refresh');
    const refreshClickStream = Observable.fromEvent(refreshButton, 'click');

    const requestStream = refreshClickStream.startWith('startup click')
      .map(() => {
        this.userIndex += 30;
        return 'https://api.github.com/users?since=' + this.userIndex;
      });

    this.responseStream = requestStream
      .mergeMap((requestUrl) => {
        return this.http.get(requestUrl).map((d) => d.json() as { html_url: string, login: string, avatar_url: string });
      });


    this.widgets.toArray().forEach((widget, i) => {
      this.userStreams[i] = this.createSuggestionStream(widget.closeClickedObservable);
    });
  }

  private createSuggestionStream(closeClickStream) {
    return closeClickStream.startWith('startup click')
      .combineLatest(this.responseStream, (click, listUsers) => {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
      })
      .startWith(null);
  }
}
