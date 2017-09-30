import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
    imports: [ RouterModule.forRoot([  { path: '', component: HomeComponent},
                                        { path: '**', component: ErrorComponent}])
             ],
    exports: [ RouterModule ]

})
export class AppRoutingModule {

}
