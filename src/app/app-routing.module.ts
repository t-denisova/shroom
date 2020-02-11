import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MushroomsComponent } from './mushrooms/mushrooms.component';
import { AddMushroomComponent } from './mushrooms/add-mushroom/add-mushroom.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './mushrooms/add-mushroom/can-deactivate-guard.service';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'mushrooms',
    component: MushroomsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'add-mushroom',
    component: AddMushroomComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard]
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
