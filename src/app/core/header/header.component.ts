import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleDarkTheme: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    
   }

  ngOnInit() {
  }

  openSiderbar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }
    

}
