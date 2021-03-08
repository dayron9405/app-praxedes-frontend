import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() options: any[] = [];

  @Output() selectOptionEmiter: EventEmitter<any>;

  dataList: any[] = [];

  constructor() {
    this. selectOptionEmiter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (changes.options) {
      this.dataList = changes.options.currentValue;
    }

  }

  selectedOption(option){
    this.selectOptionEmiter.emit(option);
  }

}
