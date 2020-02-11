import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddMushroomComponent } from './mushrooms/add-mushroom/add-mushroom.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MushroomsComponent } from './mushrooms/mushrooms.component';
import { AuthInterceptorService } from './auth/auth-interseptor.service';
import { PanelComponent } from './panel/panel.component';
import { SwitcherDirective } from './header/switcher.directive';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ModalComponent } from './modal/modal.component';
import { PlaceholderDirective } from './mushrooms/add-mushroom/placeholder.directive';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddMushroomComponent,
    PageNotFoundComponent,
    MushroomsComponent,
    PanelComponent,
    SwitcherDirective,
    SideNavComponent,
    ModalComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
