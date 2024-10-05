import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { StaffComponent } from './pages/staff/staff.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service'; // Corrija a importação para o AuthGuard

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] }, // Protegido por AuthGuard
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }, // Protegido por AuthGuard
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
