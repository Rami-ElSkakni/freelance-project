import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/auth.guard';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { AlumniComponent } from './components/alumni/alumni.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'applicant', component: ApplicantsComponent },
  { path: 'alumni', component: AlumniComponent },
  { path: 'admin', component: AdminComponent },  // Protect the admin route with the guard canActivate: [AuthGuard]
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
