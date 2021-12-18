import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: LoginComponent},
  {path: 'login', pathMatch:'full', component: LoginComponent},
  {path: 'register', pathMatch:'full',component: RegisterComponent},
  {path: 'library', pathMatch:'full',component: LibraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
