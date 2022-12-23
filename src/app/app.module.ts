import { NgModule } from '@angular/core';
import {DecimalPipe, NgFor} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsStoreModule } from './store/store.module';

import { SortableHeader } from "./directives/sortable-header.directive";
import { Error404Component } from './components/error404/error404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CategoriesComponent,
    Error404Component,
    DashboardComponent,
    ToastsComponent,
  ],
  exports: [
    NgbModule,
    NgbNavModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsStoreModule,
    NgbModule,
    NgbNavModule,
    DecimalPipe,
    NgFor,
    SortableHeader,
    FormsModule,
    NgSelectModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
