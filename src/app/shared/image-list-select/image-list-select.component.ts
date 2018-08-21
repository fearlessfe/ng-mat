import { Component, Input, forwardRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() cols = 8;
  @Input() rowHeight = '64px';
  @Input() title = '选择';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';
  @Output('itemChange') itemChange = new EventEmitter<string>();

  selected: string;

  constructor() { }

  private propagateChange = (_:any) => {};
  onChange(i){
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }
  //表单控件需要实现的三个方法，在响应式表单这一节
  writeValue(obj: any): void{
    this.selected = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  validate(fc: FormControl): {[key: string]: any} {
    return this.selected? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }


}
