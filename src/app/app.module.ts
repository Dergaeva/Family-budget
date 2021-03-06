import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/services/auth.guard';
import {GuestGuard} from './shared/services/guest.guard';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';


@NgModule({
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [UserService, AuthService, AuthGuard, GuestGuard],
  bootstrap: [AppComponent]

})
export class AppModule {
}
