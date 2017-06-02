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

  }

  private getUser(users: UserInfo[]) {
    return users[Math.floor(Math.random() * users.length)];
  }
}
