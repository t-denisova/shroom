import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptorService } from './auth/auth-interseptor.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UIShellModule } from './ui-shell/ui-shell.module';
import { MushroomsModule } from './mushrooms/mushroom.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    SharedModule,
    UIShellModule,
    MushroomsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
