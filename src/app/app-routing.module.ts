import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './components/author/author.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: '', pathMatch:'full', component: LoginComponent},
  {path: 'login', pathMatch:'full', component: LoginComponent},
  {path: 'register', pathMatch:'full',component: RegisterComponent},
  {path: 'library', pathMatch:'full',component: LibraryComponent, canActivate:[LoginGuard]},
  {path:'author', pathMatch:'full', component: AuthorComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
