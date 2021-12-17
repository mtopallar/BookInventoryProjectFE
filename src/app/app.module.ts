import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchareaComponent } from './components/searcharea/searcharea.component';
import { SearchPipe } from './pipes/search.pipe';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { LibraryComponent } from './components/library/library.component';
import { UserlibraryComponent } from './components/userlibrary/userlibrary.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchareaComponent,
    SearchPipe,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    LibraryComponent,
    UserlibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
