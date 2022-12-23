import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { TodosState } from './states/todos.state';
import { CategoriesState } from './states/categories.state';

/** Ngxs store module */
@NgModule({
  imports: [
    CommonModule,
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot(
      [
        TodosState,
        CategoriesState,
      ],
    ),
  ],
  exports: [NgxsFormPluginModule, NgxsModule],
})
export class NgxsStoreModule {}
