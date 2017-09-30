import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './shared/app.routing';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './start/app.component';
import { NavBarComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
    imports: [  BrowserModule,
                AdminModule,
                AppRoutingModule ],
    declarations: [ AppComponent,
                    NavBarComponent,
                    HomeComponent,
                    ErrorComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}
