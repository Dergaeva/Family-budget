import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {GuestGuard} from '../shared/services/guest.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
