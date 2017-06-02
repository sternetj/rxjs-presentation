import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from 'app/models/UserInfo';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.css']
})
export class UserWidgetComponent {
  @Input() user: UserInfo;
  private closeClicked = new EventEmitter();
  public closeClickedObservable: Observable<any>;

  constructor() {
    this.closeClickedObservable = this.closeClicked.asObservable();
  }
}
