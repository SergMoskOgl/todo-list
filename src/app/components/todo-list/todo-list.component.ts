import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from '@ngxs/store';
import {combineLatest} from "rxjs";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

import {TodosAddTask, TodosDeleteTask, TodosEditTask, TodosGetList} from "../../store/actions/todos.action";
import {CategoriesGetList} from "../../store/actions/categories.action";
import {CategoriesState} from "../../store/states/categories.state";
import {TodosState} from '../../store/states/todos.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @ViewChild('taskModal') taskModal: TemplateRef<any> | undefined;

  // @ts-ignore
  taskModalRef: NgbModalRef;
  todoList: any[] = [];
  categories: any[] = [];
  taskId = null;
  taskDescription = null;
  taskCategory = null;
  taskLabel = null;
  taskDone = null;
  isEdit = false;

  constructor(private store: Store, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoriesGetList());
    this.store.dispatch(new TodosGetList());

    combineLatest([
      this.store.select(TodosState.getTodoList),
      this.store.select(CategoriesState.getCategories)
    ])
    .subscribe(([list, categories]) => {
      this.categories = categories;

      this.todoList = list?.map((item) => {
        return {
          ...item,
          checked: item.done,
          categoryName: categories?.find((category) => category.id === item.category)?.name,
        }
      })?.sort((a, b) => a.id > b.id ? 1 : -1);
    });
  }

  taskSubmit(form: NgForm) {
    if (this.isEdit) {
      this.editTaskSubmit(form);
    } else {
      this.addTaskSubmit(form);
    }
  }

  addTask() {
    this.taskModalRef = this.modalService.open(this.taskModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  editTask(task: any) {
    this.isEdit = true;
    this.taskId = task.id;
    this.taskDescription = task.description;
    this.taskCategory = task.category;
    this.taskLabel = task.label;
    this.taskDone = task.done;

    this.taskModalRef = this.modalService.open(this.taskModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  addTaskSubmit(form: NgForm) {
    const formData = { ...form.value };

    for (const i of Object.keys(form.value)) {
      if (i !== 'category') {
        formData[i] = formData[i].trim();
      }
    }

    formData.done = null;

    if (formData.description) {
      this.store.dispatch(new TodosAddTask(formData)).subscribe((res) => {
        console.log('res:', res);
      });
      this.taskModalRef.dismiss();
    }
  }

  editTaskSubmit(form: NgForm) {
    const formData = { ...form.value };

    for (const i of Object.keys(form.value)) {
      if (i !== 'category') {
        formData[i] = formData[i].trim();
      }
    }

    formData.id = this.taskId;

    if (formData.id) {
      this.store.dispatch(new TodosEditTask(formData)).subscribe((res) => {
        console.log('res:', res);

        this.isEdit = false;
        this.taskId = null;
        this.taskDescription = null;
        this.taskCategory = null;
        this.taskLabel = null;
        this.taskDone = null;
      });
      this.taskModalRef.dismiss();
    }
  }

  changeDone(task: any) {
    const date = new Date();
    task.done = task.checked ? `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}` : null;

    if (task.id) {
      this.store.dispatch(new TodosEditTask(task)).subscribe((res) => {
        console.log('res:', res);
      });
    }
  }

  deleteTask(taskId: string) {
    if (taskId) {
      this.store.dispatch(new TodosDeleteTask(taskId)).subscribe((res) => {
        console.log('res:', res);
      });
    }
  }
}
