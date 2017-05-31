import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  responseStream: Observable<{
    html_url: string;
    login: string;
    avatar_url: string;
  }>;
  suggestion1Stream: Observable<any>;
  public users = [null, null, null];
  public userStreams = [];

  constructor(public http: Http) {}

  ngAfterViewInit(): void {
    const refreshButton = document.querySelector('.refresh');
    //const closeButton2 = document.querySelector('.close2');
    //const closeButton3 = document.querySelector('.close3');

    const refreshClickStream = Observable.fromEvent(refreshButton, 'click');
    // const close2ClickStream = Observable.fromEvent(closeButton2, 'click');
    // const close3ClickStream = Observable.fromEvent(closeButton3, 'click');

    const requestStream = refreshClickStream.startWith('startup click')
        .map(() => {
            var randomOffset = Math.floor(Math.random() * 500);
            return 'https://api.github.com/users?since=' + randomOffset;
        });

    this.responseStream = requestStream
        .mergeMap((requestUrl) => {
            return this.http.get(requestUrl).map((d) => d.json() as {html_url: string, login: string, avatar_url: string});
        });



    // let suggestion2Stream = createSuggestionStream(close2ClickStream);
    // let suggestion3Stream = createSuggestionStream(close3ClickStream);
  }

  public bindEvent(index, target) {
    const closeClickStream = Observable.fromEvent(target, 'click');
    this.userStreams[index] = this.createSuggestionStream(closeClickStream);
  }

  private createSuggestionStream(closeClickStream) {
        return closeClickStream.startWith('startup click')
            .combineLatest(this.responseStream,
                function(click, listUsers) {
                    return listUsers[Math.floor(Math.random() * listUsers.length)];
                }
            )
            // .merge(
            //     refreshClickStream.map(() => null)
            // )
            .startWith(null);
    }
}
