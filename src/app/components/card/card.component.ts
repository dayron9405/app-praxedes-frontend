import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataCardInterface } from 'src/app/models/dataCard/data-card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() data: any[] = [];

  @Output() contentAction: EventEmitter<any>;
  @Output() footerActionFirt: EventEmitter<any>;
  @Output() footerActionSecond: EventEmitter<any>;
  @Output() footerAction: EventEmitter<any>;

  dataCard: DataCardInterface[] = [];

  constructor() {
    this.contentAction = new EventEmitter();
    this.footerActionFirt = new EventEmitter();
    this.footerActionSecond = new EventEmitter();
    this.footerAction = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (changes.data) {
      this.dataCard = [];
      this.dataCard = changes.data.currentValue;
    }

  }

  contentActionEmiter(data){
    this.contentAction.emit(data);
  }

  footerActionfirtEmiter(data){
    this.footerActionFirt.emit(data);
  }

  footerActionSecondEmiter(data){
    this.footerActionSecond.emit(data);
  }

}
