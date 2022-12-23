import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';

import { Error404Component } from './components/error404/error404.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

// Redirect from root
const defaultRoute: Route = {
  path: '',
  redirectTo: 'dash',
  pathMatch: 'full',
};

// Everything that didn't matched redirects to error404
const notFoundRedirectRoute: Route = {
  path: '**',
  redirectTo: 'error404',
};

const routes: Routes = [
  defaultRoute,
  {
    path: 'dash',
    component: DashboardComponent,
  },
  {
    path: 'list',
    component: TodoListComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'error404',
    component: Error404Component,
  },
  notFoundRedirectRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
