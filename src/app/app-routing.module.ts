import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet/cabinet.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/cabinet', pathMatch: 'full' },
  { path: 'cabinet', component: CabinetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
