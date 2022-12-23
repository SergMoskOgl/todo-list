import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { TodosStateModel } from '../models/TodosState';
import {TodosAddTask, TodosDeleteTask, TodosEditTask, TodosGetList} from '../actions/todos.action';
import {TodoService} from "../../services/todo.service";

@State<TodosStateModel>({
  name: 'Todos',
  defaults: {
    todoList: [],
  },
})
@Injectable()
export class TodosState {
  /**
   * get todoList
   * @param state: TodosStateModel
   */
  @Selector()
  static getTodoList(state: TodosStateModel) {
    return state.todoList;
  }

  constructor(private todoService: TodoService) {}

  /**
   * Get task list
   * @param patchState: StateContext<TodosStateModel>
   */
  @Action(TodosGetList)
  todosGetList({ patchState }: StateContext<TodosStateModel>) {
    this.todoService.getTodoList().subscribe(
      (todoList) => {
        patchState({
          todoList,
        });
      },
      (err) => {
        throw err.error;
      }
    );
  }

  /**
   * Add new task
   * @param { getState, patchState }: StateContext<TodosStateModel>
   * @param action: TodosAddTask
   */
  @Action(TodosAddTask)
  todosAddTask({ getState, patchState }: StateContext<TodosStateModel>, action: TodosAddTask) {
    if (action.payload) {
      const { todoList } = getState();

      this.todoService.addTodoTask(action.payload).subscribe(
        (res) => {
          if (res) {
            patchState({
              todoList: [ ...todoList, res ],
            });
            return res;
          }
        },
        (err) => {
          throw err.error;
        }
      );
    }
  }

  /**
   * Edit task
   * @param { getState, patchState }: StateContext<TodosStateModel>
   * @param action: TodosAddTask
   */
  @Action(TodosEditTask)
  todosEditTask({ getState, patchState }: StateContext<TodosStateModel>, action: TodosEditTask) {
    if (action.payload) {
      const { todoList } = getState();

      this.todoService.editTodoTask(action.payload).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            patchState({
              todoList: [ ...todoList.filter((item) => item.id !== action.payload.id), res ],
            });
            return res;
          }
        },
        (err) => {
          throw err.error;
        }
      );
    }
  }

  /**
   * Delete task
   * @param { getState, patchState }: StateContext<TodosStateModel>
   * @param action: TodosAddTask
   */
  @Action(TodosDeleteTask)
  deleteTask({ getState, patchState }: StateContext<TodosStateModel>, action: TodosDeleteTask) {
    if (action.payload) {
      const { todoList } = getState();
      this.todoService.deleteTask(action.payload).subscribe(
        (res) => {
          if (res) {
            patchState({
              todoList: todoList.filter((item) => item.id !== action.payload),
            });
            return res;
          }
        },
        (err) => {
          throw err.error;
        }
      );
    }
  }
}
