import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchPipe } from './pipes/search.pipe';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { LibraryComponent } from './components/library/library.component';
import { UserlibraryComponent } from './components/userlibrary/userlibrary.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthorComponent } from './components/author/author.component';
import { AuthorSearchPipe } from './pipes/author-search.pipe';
import { GenreComponent } from './components/genre/genre.component';
import { GenreSearchPipe } from './pipes/genre-search.pipe';
import { PublisherSearchPipe } from './pipes/publisher-search.pipe';
import { PublisherComponent } from './components/publisher/publisher.component';
import { BookDtoSearchPipe } from './pipes/bookDto-search.pipe';
import { BookComponent } from './components/book/book.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchPipe,
    RegisterComponent,
    LoginComponent,
    LibraryComponent,
    UserlibraryComponent,
    AuthorComponent,
    AuthorSearchPipe,
    GenreComponent,
    GenreSearchPipe,
    PublisherSearchPipe,
    PublisherComponent,
    BookDtoSearchPipe,
    BookComponent
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
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
