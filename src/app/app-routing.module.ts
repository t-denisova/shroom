import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MushroomsComponent } from './mushrooms/mushrooms.component';
import { CreateMushroomComponent } from './create-mushroom/create-mushroom.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuard } from './create-mushroom/can-deactivate-guard.service';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mushrooms/:classification', component: MushroomsComponent },
  { path: 'create-mushroom', canActivate: [AuthGuardService], component: CreateMushroomComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'login', component: AuthComponent },
  { path: 'signup', component: AuthComponent },
  { path: 'not-found', component: PageNotFoundComponent }, //error?
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
