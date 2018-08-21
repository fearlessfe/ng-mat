import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss']
})
export class SiderbarComponent implements OnInit {

  @Output() navClick = new EventEmitter<void>();
  today = 'day';
  constructor() { }

  ngOnInit() {
    // getDate:获取一个月中的几号
    this.today = `day${getDate(new Date())}`;
  }

  onNavClick(){
    this.navClick.emit();
  }

}
