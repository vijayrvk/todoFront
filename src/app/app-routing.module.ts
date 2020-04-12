import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {RegisterComponent} from './pages/register/register.component';
import {ViewTaskComponent} from './pages/task/view-task/view-task.component';
import {CreateTaskComponent} from './pages/task/create-task/create-task.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'login',
  component: LoginComponent,
}, {
  path: 'register',
  component: RegisterComponent,
}, {
  path: 'view-task',
  component: ViewTaskComponent,
}, {
  path: 'create-task',
  component: CreateTaskComponent,
}, {
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
