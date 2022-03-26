import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { GenreComponent } from './components/genre/genre.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { OperationclaimsComponent } from './components/operationclaims/operationclaims.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { RegisterComponent } from './components/register/register.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { UserMyProfileComponent } from './components/user-my-profile/user-my-profile.component';
import { UserlibraryComponent } from './components/userlibrary/userlibrary.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: '', pathMatch:'full', component: LoginComponent},
  {path: 'login', pathMatch:'full', component: LoginComponent},
  {path: 'register', pathMatch:'full',component: RegisterComponent},
  {path: 'library', pathMatch:'full',component: LibraryComponent, canActivate:[LoginGuard]},
  {path:'authors', pathMatch:'full', component: AuthorComponent, canActivate:[LoginGuard]},
  {path:'genres', pathMatch:'full', component: GenreComponent, canActivate:[LoginGuard]},
  {path:'publishers', pathMatch:'full', component: PublisherComponent, canActivate:[LoginGuard]},
  {path:'books', pathMatch:'full', component: BookComponent, canActivate:[LoginGuard]},
  {path:'userlibrary', pathMatch:'full', component: UserlibraryComponent, canActivate:[LoginGuard]},
  {path:'useradmin', pathMatch:'full', component: UserAdminComponent, canActivate:[LoginGuard]},
  {path:'myprofile', pathMatch:'full', component: UserMyProfileComponent, canActivate:[LoginGuard]},
  {path:'operationclaims', pathMatch:'full', component: OperationclaimsComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
