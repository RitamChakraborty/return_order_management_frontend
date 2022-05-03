import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {HomeComponent} from "./view/home/home.component";
import {AuthenticationGuard} from "./guard/authentication-guard/authentication.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
