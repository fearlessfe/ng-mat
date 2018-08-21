import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import * as fromQuote from './quote.reducer';

import * as class from '../actions/class';

export interface State {
    quote: fromQuote.State;     
};

const initialState: State = {
    quote: fromQuote.initialState    
};

export function reducer(state = initialState, action: class.Actions ): State {
    switch (action.type) {
        case class.ActionTypes.TYPE: {
            return {
                // return new class state
            };
        }

        default: {
            return state;
        }
    }
}

@NgModule({
    declarations: [  ],
    imports: [
        StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
        StoreRouterConnectingModule,
        // DevTool 需要在 StoreModule 之后导入
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
    ],

})
export class AppStoreModule {}