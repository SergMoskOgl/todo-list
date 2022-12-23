
export class TodosGetList {
  static readonly type = '[Todos] Get list';
}

export class TodosAddTask {
  static readonly type = '[Todos] Add task';
  constructor(public payload: any) {}
}

export class TodosEditTask {
  static readonly type = '[Todos] Edit task';
  constructor(public payload: any) {}
}

export class TodosDeleteTask {
  static readonly type = '[Todos] Delete task';
  constructor(public payload: any) {}
}
