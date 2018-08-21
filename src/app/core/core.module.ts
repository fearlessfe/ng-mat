import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { FooterComponent } from './footer/footer.component';

import { loadSvgResources } from '../utils/svg.util';
import { AppRoutingModule } from '../app-routing.module';

import { combineLatest, merge, Subscription, } from 'rxjs';
import { map, filter, startWith, debounceTime, distinctUntilChanged, take } from 'rxjs/operators';


import 'hammerjs';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    SiderbarComponent,
    FooterComponent,
    AppRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    SiderbarComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: 'http//localhost:3000'
    }
  ]
})
export class CoreModule {
  //该模块自加载一次,SkipSelf避免自循环，Optional为第一次加载做准备
  constructor(
    @SkipSelf() @Optional() parent : CoreModule,
    ir:MatIconRegistry, 
    ds: DomSanitizer
    ){
    if(parent){
      throw new Error("模块已存在，不能再次加载！");
    }
    loadSvgResources(ir,ds);
  }
 }
