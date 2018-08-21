import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnim = trigger('item',[
    state('in',style({
        'border-left-width': '3px'
    })),
    state('out',style({
        'border-left-width': '6px'
    })),
    transition('in => hover', animate('100ms ease-in')),
    transition('out => out', animate('100ms ease-out')),
])