import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistrarComponent } from './registrar/registrar.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
