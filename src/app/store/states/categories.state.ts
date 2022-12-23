import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { CategoriesStateModel } from '../models/CategoriesState';
import { CategoriesGetList } from '../actions/categories.action';
import {TodoService} from "../../services/todo.service";

@State<CategoriesStateModel>({
  name: 'Categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState {
  /**
   * get categories
   * @param state: CategoriesStateModel
   */
  @Selector()
  static getCategories(state: CategoriesStateModel) {
    return state.categories;
  }

  constructor(private todoService: TodoService) {}

  /**
   * Check if tenant is valid & put result to state
   * @param patchState: StateContext<CategoriesStateModel>
   * @param action: CategoriesGetList
   */
  @Action(CategoriesGetList)
  categoriesGetList({ patchState }: StateContext<CategoriesStateModel>) {
    this.todoService.getCategories().subscribe(
      (categories) => {
        patchState({
          categories,
        });
      },
      (err) => {
        throw err.error;
      }
    );
  }
}
