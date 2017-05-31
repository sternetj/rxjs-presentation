import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.css']
})
export class UserWidgetComponent implements AfterViewInit {
  @Input() user: any;
  @Output() onCreated: EventEmitter<Element> = new EventEmitter<Element>();
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.onCreated.emit(this.closeButton.nativeElement);
  }
}
