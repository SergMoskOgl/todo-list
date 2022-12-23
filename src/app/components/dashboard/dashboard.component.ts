import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';

import {SortEvent, SortableHeader} from '../../directives/sortable-header.directive';
import {TodosEditTask, TodosGetList} from '../../store/actions/todos.action';
import {TodosState} from '../../store/states/todos.state';
import {combineLatest} from "rxjs";
import {CategoriesState} from "../../store/states/categories.state";
import {CategoriesGetList} from "../../store/actions/categories.action";

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active = 1;

  // @ts-ignore
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  initTodoList: any[] = [];
  todoList: any[] = [];
  categories: any[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoriesGetList());
    this.store.dispatch(new TodosGetList());

    combineLatest([
      this.store.select(TodosState.getTodoList),
      this.store.select(CategoriesState.getCategories)
    ])
      .subscribe(([list, categories]) => {
        this.categories = categories;

        this.initTodoList = list?.map((item) => {
          return {
            ...item,
            checked: item.done,
            categoryName: categories?.find((category) => category.id === item.category)?.name,
          }
        })?.sort((a, b) => a.id > b.id ? 1 : -1);
        this.todoList = this.initTodoList;
      });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.todoList = this.initTodoList;
    } else {
      this.todoList = [...this.initTodoList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  changeDone(task: any) {
    const date = new Date();
    task.done = task.checked ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : null;

    if (task.id) {
      this.store.dispatch(new TodosEditTask(task)).subscribe((res) => {
        console.log('res:', res);
      });
    }
  }
}
