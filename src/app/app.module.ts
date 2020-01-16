import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CreateMushroomComponent } from './create-mushroom/create-mushroom.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuard } from './create-mushroom/can-deactivate-guard.service';
import { MushroomsComponent } from './mushrooms/mushrooms.component';
import { MushroomsService } from './mushrooms/mushrooms.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreateMushroomComponent,
    PageNotFoundComponent,
    MushroomsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuardService, CanDeactivateGuard, MushroomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
